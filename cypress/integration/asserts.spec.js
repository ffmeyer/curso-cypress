/// <reference types="cypress" />

it('Equality', () => {
    const a = 1;
    expect(a).equal(1);
    expect(a, 'Deveria ser 1').equal(1);
    expect(a).to.be.equal(1);
    expect('a').not.to.be.equal('b');
})


it('Truphy', () => {
    const a = true;
    const b = null;
    let c;
    expect(a).to.be.true
    expect(true).to.be.true    
    expect(b).to.be.null;
    expect(a).not.to.be.null;
    expect(a).to.be.not.null;
    expect(c).to.be.undefined;
})

it('Objects', () => {
    const obj = {
        a: 1,
        b: 2
    }

    expect(obj).equal(obj)
    expect(obj).equals(obj)
    expect(obj).eq(obj)
    expect(obj).to.be.eq(obj )
    expect(obj).not.to.be.eq({a:1, b:2})  //referencias diferentes
    expect(obj).to.be.deep.eq({a:1, b:2}) //valida atributos do objeto
    expect(obj).eql({a:1, b:2 })          //equivalente a deep
    expect(obj).include({a:1})            //ver somente 1 propriedade
    expect(obj).to.have.property('b')     //ver se tem o atributo
    expect(obj).to.have.property('b',2)   //ver se tem o atributo E o valor
    expect(obj).to.not.be.empty           // nao vazio
    expect({}).to.be.empty                // vazio  

})


it('Arrays', () => {
    const arr = [1,2,3]
    expect(arr).to.have.members([1,2,3])
    expect(arr).to.include.members([1,3])
    expect(arr).to.not.be.empty
    expect([]).to.be.empty

})

it('Types', () => {
    const num = 1
    const str = 'String'

    expect(num).to.be.a('number')
    expect(str).to.be.a('string')
    expect({}).to.be.an('object')
    expect([]).to.be.an('array')

})

it('String', () => {
    const str = 'String de teste'

    expect(str).to.be.equal('String de teste')
    expect(str).to.have.length('15')    
    expect(str).to.contains('de')
    expect(str).to.match(/^String/)
    expect(str).to.match(/teste$/)
    expect(str).to.match(/.{15}/)
    expect(str).to.match(/\w+/)
    expect(str).to.match(/\D+/)
})

it('Numbers', () => {
    const number = 4
    const floatNumber = 5.2123
    expect(number).to.equal(4)
    expect(number).to.above(3)
    expect(number).to.below(7)
    expect(floatNumber).to.equal(5.2123)
    expect(floatNumber).to.closeTo(5.2, 0.1)
    expect(floatNumber).to.above(5)
})




describe('A external test...', () => {

})


