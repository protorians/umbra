export namespace FileUtility {

    export async function readBlob(blob: Blob) {
        return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(blob);
        });
    }
    
    export function JsonParser(input: string): any {
        return JSON.parse(
            input
                .replace(/\/\/.*(?=[\n\r])/g, '')
                .replace(/\/\*[\s\S]*?\*\//g, '')
                .replace(/,\s*([}\]])/g, '$1')
        );
    }

}