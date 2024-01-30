export function hasTimePassedSinceExpiration(expiresAt: Date, minutes: number): boolean {
    const currentTime = new Date();
    const expirationTime = new Date(expiresAt.getTime() + minutes * 60000); // Convert minutes to milliseconds

    return currentTime > expirationTime;
}