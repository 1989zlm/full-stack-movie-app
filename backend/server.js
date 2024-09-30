
const http = require('http');
const getRequest = require('./methods/get')
const postRequest = require('./methods/post')
const deleteRequest = require('./methods/delete')
const defaultRequest = require('./methods/default');
const optionsRequest = require('./methods/options');

//1) server oluştur
const server = http.createServer((req, res) => {
    // console.log('🔥istek geldi', req.method)
    //res.end('server saglikli')
    //! console.log(req.method) frontend tarafından istek atıp kontrol ettik ve cros için access-control ekledik
    //kod kalabalığı olmaması için isteklere cevap gönderen fonksiyonları ayrı dosyalarda tanımladık
    res.setHeader('Content-Type', 'application/json') //? göndereceğimiz bütün cevaplar json bu ortak bi cevaptır bi kere yaxdık (bütün cevaplara eklenecek ortak veri tipi header'ı)

    //cors hatasının getteki çözümü(kaynak paylaşımında sorun yaşamamak için) //!get istedğindeki CORS hatası çözümü
    //  res.setHeader('Access-Control-Allow-Origin', '*') böylede olur
    res.setHeader('Access-Control-Allow-Origin', '*')

    //! Post isteğindeki cors hatası çözümü

    console.log('istek geldi ', req.method)

    switch (req.method) {
        case 'GET':
            // return res.end('GET İSTEĞİ ALDILANDI')
            return getRequest(req, res)

        case 'POST':
            // return res.end('POST İSTEĞİ ALGILANDI')
            return postRequest(req, res)

        case 'DELETE':
            // return res.end('DELETE İSTEĞİ ALDILANDI')
            return deleteRequest(req, res)

        //? Post isteği atınca tarayıcıdan CORS hatasındaki çözümü(options)
        case 'OPTIONS':
            return optionsRequest(req, res)


        default:
            return defaultRequest(req, res)
    }





})


//2) belirli bir porta gelen istekleri dinle
const port = 4090;

server.listen(port, () => {
    console.log(`server ${port} gelen istekleri dinlemeye başladı`)
})
