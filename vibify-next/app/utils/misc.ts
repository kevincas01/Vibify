export function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  export function convertDuration(durationMs: number): string {
    const totalSeconds = Math.floor(durationMs / 1000); 
    const minutes = Math.floor(totalSeconds / 60);      
    const seconds = totalSeconds % 60;                  
  
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }