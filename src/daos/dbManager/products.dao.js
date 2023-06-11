import { productModel } from "../../models/product.model.js"



class ProductDao {
    async getAll({limit=10, page=1, sort, category, status}){
        const sortValidValues = ['-price', "price", '-stock', 'stock']
        try{
            let query = {};
            if(category || status){
                query = {category} || {status}
            }
            if(isNaN(limit) || limit <= 0){
                throw 'El valor para la propiedad "limit" debe ser un número mayor a cero'
            }
            if(isNaN(page)){
                throw 'Page is not a number';
            }
            let sortValue = {price:1};
            if (sort) {
                sortValue = sortValidValues.includes(sort) ? { [sort.substr(1)]: sort.startsWith('-') ? -1 : 1 } : sortValue;
            }
    
            return await productModel.paginate(query, {limit: limit, page: page, sort: sortValue});
    
        }catch(err){
            console.log(err)
        }
    
    }


    async getById(id){
        return await productModel.findById(id);
    }

    async create(data) {

        try {
            const create = await productModel.create(data);
            return create;
        } catch (error) { 
            console.error('Error al crear el producto:', error);
            throw error;
        }
        
    }

    async update(id, data){
        return await productModel.findByIdAndUpdate(id, data, { new: true })
    }

    async delete(id){
        return await productModel.findByIdAndDelete(id);
    }
}

export default new ProductDao();

