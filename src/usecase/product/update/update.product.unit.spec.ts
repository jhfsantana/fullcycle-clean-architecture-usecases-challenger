import ProductFactory from "../../../domain/product/factory/product.factory"
import UpdateProductUseCase from "./update.product";




const product = ProductFactory.create("a", "iPhone 8", 3000);


const input = {
    id: product.id,
    name: 'iPhone 12 Pro Max',
    price: 8000
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('unit tests product update use cases', () => {

    afterEach(() => {

        input.name = "iPhone 12 Pro Max";
        input.price = 8000;
    });

    it('should update a product', async () => {

        const productRepository = MockRepository();

        const usecase = new UpdateProductUseCase(productRepository);

        await usecase.execute(input);

        const productUpdated = await productRepository.find(input.id);

        expect(productUpdated.id).toEqual(input.id)
        expect(productUpdated.name).toEqual(input.name)
        expect(productUpdated.price).toEqual(input.price)
    });


    it('should throw error when name is missing', async () => {

        const productRepository = MockRepository();

        const usecase = new UpdateProductUseCase(productRepository);

        input.name = ""
        
        expect( async () => {
            await usecase.execute(input);
        }).rejects.toThrow(`Name is required`);
    });
    

    it('should throw error when price is negative', async () => {

        const productRepository = MockRepository();

        const usecase = new UpdateProductUseCase(productRepository);

        input.price = -10
        
        expect( async () => {
            await usecase.execute(input);
        }).rejects.toThrow(`Price must be positive`);
    });
});