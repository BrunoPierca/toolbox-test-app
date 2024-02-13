const axios = require('axios')

const token = 'Bearer aSuperSecretKey'

const axiosFileInstance = axios.create({
  baseURL: 'https://echo-serv.tbxnet.com/v1/secret',
  headers: {
    authorization: token
  }
})

const getFileList = async () => {
  const { data } = await axiosFileInstance.get('/files')
  return data
}

const getFormattedFile = async (fileName) => {
  const { data: file } = await axiosFileInstance.get(`/file/${fileName}`)
  const formattedFile = formatFile(fileName, file)
  return formattedFile
}

const getAllFormattedFiles = async () => {
  const fileList = await getFileList()
  const promises = fileList.files.map((file) => axiosFileInstance.get(`/file/${file}`))

  const responses = await Promise.allSettled(promises)

  const formattedResponses = []

  responses.filter((response) => response.status === 'fulfilled').forEach(
    (response) => {
      const { data, request } = response.value

      const fileName = request.path.split('/').pop()

      const formattedFile = formatFile(fileName, data)

      if (formattedFile.lines.length > 0) formattedResponses.push(formattedFile)
    })

  return formattedResponses
}

// Helpers

const formatFile = (fileName, fileData) => {
  const lines = []
  fileData.replace(/\r/g, '')
    .split('\n')
    .slice(1)
    .forEach((line) => {
      const [, text, number, hex] = line.split(',')
      if ([text, +number, hex].every((value) => !(!value || value === ''))) lines.push({ text, number: +number, hex })
    })

  return { file: fileName, lines }
}

module.exports = {
  getFileList,
  getFormattedFile,
  getAllFormattedFiles,
  formatFile
}
