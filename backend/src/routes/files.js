const { Router } = require('express')

const { getFormattedFile, getFileList, getAllFormattedFiles } = require('../controllers/files.controller.js')

const router = Router()

router.get('/list', async (req, res) => {
  try {
    const fileList = await getFileList()
    return res.status(200).send(fileList)
  } catch (error) {
    return res.status(error.response?.status ?? 500).send({ message: error.message ?? 'Something went wrong', code: error.code ?? undefined })
  }
})

router.get('/data', async (req, res) => {
  const fileName = req.query.fileName
  try {
    if (!fileName) {
      const files = await getAllFormattedFiles()
      return res.status(200).send(files)
    }

    const file = await getFormattedFile(fileName)
    return res.status(200).send(file)
  } catch (error) {
    res.status(error.response?.status ?? 500).send({ message: error.message ?? 'Something went wrong', code: error.code ?? undefined })
  }
})

module.exports = router
