import { ContextId, ContextIdStrategy, HostComponentInfo } from '@nestjs/core';
import { Request } from 'express';

const tenants = new Map<string, ContextId>();

export class DurableContextIdStrategy implements ContextIdStrategy {
  attach(contextId: ContextId, request: Request) {
    const tenantId = request.headers['x-tenant-id'] as string;
    const forceError = request.headers['x-force-error'] === 'true';

    let tenantSubTreeId: ContextId;

    if (tenants.has(tenantId)) {
      tenantSubTreeId = tenants.get(tenantId);
    } else {
      tenantSubTreeId = { id: +tenantId } as ContextId;
      tenants.set(tenantId, tenantSubTreeId);
    }

    const payload: {
      tenantId: string;
      forceError?: boolean;
    } = { tenantId };
    if (forceError) {
      payload.forceError = true;
    }
    return {
      resolve: (info: HostComponentInfo) =>
        info.isTreeDurable ? tenantSubTreeId : contextId,
      payload,
    };
  }
}
