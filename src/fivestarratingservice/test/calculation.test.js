const functions = require('../app/controllers/calculation');

test('Multiple Ratings on one product', () => {
    expect(functions([
        { _id: '5de996172d79097eeb22b223', productID: 'NKDF2787L', rating: 3 },
        { _id: '5de996172d79097eeb22b223', productID: 'NKDF2787L', rating: 5 },
        { _id: '5de996172d79097eeb22b223', productID: 'NKDF2787L', rating: 2 },
        { _id: '5de996172d79097eeb22b223', productID: 'NKDF2787L', rating: 1 }
      ])).toEqual({value: 2.75, ratings: 4});
}); 

test('Rounding to 2 digits', () => {
    expect(functions([
        { _id: '5de996172d79097eeb22b223', productID: 'NKDF2787L', rating: 3 },
        { _id: '5de996172d79097eeb22b223', productID: 'NKDF2787L', rating: 5 },
        { _id: '5de996172d79097eeb22b223', productID: 'NKDF2787L', rating: 2 }
    ])).toEqual({value: 3.33, ratings: 3});
}); 

test('Wrong Input', () => {
    expect(functions([
    ])).toEqual({value: 0, ratings: 0});
}); 