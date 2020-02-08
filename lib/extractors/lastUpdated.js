module.exports = async (rdlevel, zip) => {
  const rdlevelFile = await zip.file('main.rdlevel')
  return {
    lastUpdated: rdlevelFile.date
  }
}
