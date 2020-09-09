export default new class SerializationHelper {

    modelToString = (model) => {
        return Buffer.from(JSON.stringify(model), "utf8").toString("base64");
        //return bson.serialize(model).toString("base64");
    }

    stringToModel = (str) => {
        return JSON.parse(Buffer.from(str, "base64").toString("utf8"));
        //return bson.deserialize(Buffer.from(str, "base64"));
    }
}