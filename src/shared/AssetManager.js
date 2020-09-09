
export default new class AssetManager {

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    onUpload = async (file, onProgress) => {

        return this.toBase64(file);
    }

};