const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/app.js')
const { formatFile } = require('../src/controllers/files.controller.js')

// Configure chai
chai.use(chaiHttp)

const { expect, assert } = chai

const exampleFileData = 'file,text,number,hex \n test3.csv,osvLL \n test3.csv,vviaEqXQIBhtRtfpBHeiEcmoiyaiL,2,3c98e11bd451c585f378bdcbc715f854 \n test3.csv,xLzouFJMtqgVkmw,9531,bd6f2cd455f1e318044fdb31f172d680 \n test3.csv,Aoid,6,97ab51d75a6b0a4c82c195d40f79de1d'

describe('Backend API Tests', () => {
  describe('GET /files/list', () => {
    it('should return a list of files', async () => {
      const res = await chai.request(app).get('/files/list')
      expect(res).to.have.status(200)
      expect(res.body).to.have.property('files')
      expect(res.body.files).to.be.an('array')
      res.body.files.forEach((item) => assert.isString(item))
    })
  })

  describe('GET /files/data', () => {
    it('should return data for all files if no fileName is provided', async () => {
      const res = await chai.request(app).get('/files/data')
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('array')
      res.body.forEach((item) => {
        expect(item).to.have.property('file')
        expect(item).to.have.property('lines')
        expect(item.lines).to.be.an('array').with.length.above(0)
        item.lines.forEach((line) => {
          expect(line).to.have.property('text')
          expect(line).to.have.property('number').to.be.a('number')
          expect(line).to.have.property('hex')
        })
      })
    })

    it('should return data for a specific file', async () => {
      const { body } = await chai.request(app).get('/files/data')
      const fileName = body[0].file
      const res = await chai.request(app).get(`/files/data?fileName=${fileName}`)
      expect(res).to.have.status(200)
      expect(res.body).to.have.property('file')
      expect(res.body).to.have.property('lines')
    })

    it('should handle errors for unexistent files', async () => {
      const fileName = 'extremelyUnprobableFileName.mock'
      const res = await chai.request(app).get(`/files/data?fileName=${fileName}`)
      expect(res).to.have.status(404)
      expect(res.body).to.have.property('message')
    })
  })

  describe('File Formatter', () => {
    it('should format files in a specific way', () => {
      const formattedFile = formatFile('MockFileName', exampleFileData)
      expect(formattedFile).to.have.property('file')
      expect(formattedFile).to.have.property('lines')
      expect(formattedFile.lines).to.have.be.an('array')
      if (formattedFile.lines.length > 0) {
        formattedFile.lines.forEach((line) => {
          expect(line).to.have.property('text')
          expect(line).to.have.property('number').to.be.a('number')
          expect(line).to.have.property('hex')
        })
      }
    })
  })
})
