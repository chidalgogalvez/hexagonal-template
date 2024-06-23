import { IThrottlerConfiguration } from '../env/config-loader';
import { ConfigService } from '@nestjs/config';

const throttlerConfig = (
  configService: ConfigService<Record<string, unknown>, false>,
): { ttl: number; limit: number } => {
  const rateLimitConfig: IThrottlerConfiguration =
    configService.get('throttler');
  return {
    ttl: rateLimitConfig.ttl,
    limit: rateLimitConfig.limit,
  };
};

export default throttlerConfig;
