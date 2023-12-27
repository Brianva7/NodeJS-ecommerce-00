import fs from "fs";

export default class productMemory {
  constructor() {
    this.file = "../files/products.json";
  }

  getProducts = async () => {
    try {
      if (!fs.existsSync(this.file)) {
        return "There are no files";
      } else {
        let data = await fs.promises.readFile(this.file, "utf-8");
        let files = JSON.parse(data);
        return files;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  getProductById = async (id) => {
    try {
      if (!fs.existsSync(this.file)) {
        return "There are no files";
      } else {
        let data = await fs.promises.readFile(this.file, "utf-8");
        let files = JSON.parse(data);
        let file = files.find((f) => f.id === id);
        if (!file) {
          return "File does not exist";
        } else {
          return file;
        }
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  createProduct = (obj) => {
    try {
      if (!fs.existsSync(this.file)) {
        fs.writeFileSync(this.file, JSON.stringify([], null, 2));
      }
      let data = fs.readFileSync(this.file, "utf-8");
      let files = JSON.parse(data);
      console.log(data);
      if (files.length === 0) {
        obj.id = 1;
      } else {
        obj.id = Math.max(...files.map((f) => f.id)) + 1;
      }
      files.push(obj);
      fs.writeFileSync(this.file, JSON.stringify(files, null, 2));
      return obj;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  deleteProduct = async (id) => {
    try {
      if (!fs.existsSync(this.file)) {
        return "There are no files";
      } else {
        let data = await fs.promises.readFile(this.file, "utf-8");
        let files = JSON.parse(data);
        const maxId = Math.max(...files.map((f) => f.id));
        if (id > maxId) {
          return "file does not exist";
        } else {
          let newFiles = files.filter((f) => f.id !== id);
          fs.writeFileSync(this.file, JSON.stringify(newFiles, null, 2));
          return newFiles;
        }
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  updateProduct = async (id, obj) => {
    try {
      if (!fs.existsSync(this.file)) {
        return "There are no files";
      } else {
        let data = await fs.promises.readFile(this.file, "utf-8");
        let files = JSON.parse(data);
        const maxId = Math.max(...files.map((f) => f.id));
        if (id > maxId) {
          return "file does not exist";
        } else {
          let newFiles = files.map((f) => {
            if (f.id === id) {
              return { ...f, ...obj };
            } else {
              return f;
            }
          });
          fs.writeFileSync(this.file, JSON.stringify(newFiles, null, 2));
          return newFiles;
        }
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}
