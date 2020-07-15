const hexToBinary = require ('hex-to-binary')
const Block = require ('./block');
const {GENESIS_DATA, MINE_RATE} = require('../config');
const cryptoHash = require('../util/crypto-hash');

describe('Block', () => {
    const timestamp = 2000;
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain','data'];
    const nonce = 1;
    const difficulty = 1;


    const block = new Block (
        {
            timestamp: timestamp,
            lastHash: lastHash,
            hash: hash,
            data: data, 
            nonce, 
            difficulty
        }
    )

    it('has a timestamp, lastHash, hash, anda data, nonce, difficulty property', ()=>{
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);
    })





describe ('genesis()', () => {
    const genesisBlock = Block.genesis();
    console.log('gensisblock', genesisBlock)

    it('returns a Block instance', () => {
        expect (genesisBlock instanceof Block).toEqual(true)
    })

    it ('return the genesis data', () => {
        expect (genesisBlock).toEqual(GENESIS_DATA)
    })
})

describe ('mineBlock()', () => {
    const lastBlock = Block.genesis();
    const data = 'mined data';
    const minedBlock = Block.mineBlock( { lastBlock, data})

    it('returns a Block instance', () => {
        expect (minedBlock instanceof Block).toBe(true)
    })
    it ('sets the `lastHash` to be the `hash` of the lastblock', () => {
        expect (minedBlock.lastHash).toEqual(lastBlock.hash)
    })

    it ('sets the `data`', () => {
        expect(minedBlock.data).toEqual(data);
    })
    it ('sets the `timestamp`', () => {
        expect(minedBlock.timestamp).not.toEqual(undefined);
    })

    it ('creates a sha 256 hash ased on the propier inputs', () => {
        expect(minedBlock.hash)
            .toEqual(cryptoHash(
                minedBlock.timestamp,
                minedBlock.nonce,
                minedBlock.difficulty, 
                lastBlock.hash,
                data
                ))
    })

    it ('sets a hash ttht matchets de difficulty criteria', () => {
        expect (hexToBinary(minedBlock.hash).substring(0,minedBlock.difficulty))
        .toEqual('0'.repeat(minedBlock.difficulty))
    })
})


describe ('adjustDifficultt', () => {
    it('raises the difficulty for a quicly mined blok', () =>  {
        expect (Block.adjustDifficulty({
            originalBlock: block,
            timestamp: block.timestamp + MINE_RATE - 100
        })).toEqual (block.difficulty +1)
    })
    it('lower the difficulty for a quicly mined blok', () =>  {
        expect(Block.adjustDifficulty({
            originalBlock: block,
            timestamp: block.timestamp + MINE_RATE + 100
        })).toEqual(block.difficulty-1)
    })
})

})
