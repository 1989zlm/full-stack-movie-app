const defaultRequest = (req, res) => {
    // cevabın durum kodunu belirle
    res.statusCode = 404;

    //cevaba gönderilecek içeriğin tipini header olarak ekle
    //!böylece postmande clienta gönderilen cevap text değil json olarak gönderilecek
    //res.setHeader('Content-Type', 'application/json')//?ortak olarak server'a yazdık

    //cevabın içeriğini belirle()
    res.write(JSON.stringify({ message: 'istek adresi algılanamadı' }))

    //cevabı clienta gönder
    // return res.end('İSTEK TÜRÜ ALGILANAMADI')
    res.end()
}
module.exports = defaultRequest;