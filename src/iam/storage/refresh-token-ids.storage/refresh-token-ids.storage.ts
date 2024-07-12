import { OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { Redis } from 'ioredis';

export class RefreshTokenIdsStorage
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private redisClient: Redis;
  onApplicationBootstrap() {
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onApplicationShutdown(signal?: string) {
    this.redisClient.quit();
  }

  async insert(userId: number, tokenId: string): Promise<void> {
    await this.redisClient.set(this.getKey(userId), tokenId);
  }

  async validate(userId: number, tokenId: string): Promise<boolean> {
    const storedTokenId = await this.redisClient.get(this.getKey(userId));
    if (storedTokenId !== tokenId) {
      throw new Error('Invalid refresh token');
    }
    return storedTokenId === tokenId;
  }

  async invalidate(userId: number): Promise<void> {
    await this.redisClient.del(this.getKey(userId));
  }

  private getKey(userId: number): string {
    return `user-${userId}`;
  }
}
