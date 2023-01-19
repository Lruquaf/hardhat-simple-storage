const {ethers} = require("hardhat")
const {expect, assert} = require("chai")

describe("SimpleStorage", function () {
    let simpleStorage, simpleStorageFactory
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })
    it("Should with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("Should update when we call store", async function () {
        const expectedValue = "99"
        const txResponse = await simpleStorage.store(expectedValue)
        await txResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("Should add a person with fav number when we call addPerson", async function () {
        const expectedValue = "78"
        const expectedString = "Yavuz"
        const txResponse = await simpleStorage.addPerson(
            expectedString,
            expectedValue
        )
        await txResponse.wait(1)
        const currentValue = await simpleStorage.nameToFavoriteNumber(
            expectedString
        )
        const person = await simpleStorage.people(0)
        const currentName = person.name
        const currentNumber = person.favoriteNumber
        assert.equal(currentValue.toString(), expectedValue)
        assert.equal(currentName.toString(), expectedString)
        assert.equal(currentNumber.toString(), expectedValue)
    })
})
