const fs = require('fs')

const getRequest = (req, res) => {
    //DOSYAYI OKUYACAK   // İŞLEYECEZ   //KOŞULLARA BAKICAZ   //CEVAP GÖNDER

    //url'in temel adresini değişkene aktar//! sondaki param dışarısında kalan
    //  const path = req.url.substring(0, req.url.lastIndexOf('/')); //? frontend tarafındaki arama için güncelleme yapıldı
    const path = req.url.slice(0, 11)

    //console.log(req.url)
    //urlin sonundaki id değerini değişkene aktar
    const id = req.url.split('/')[3]

    // console.log(id)
    // console.log(path)

    // URL'in sonundaki parametre değerini al
    //console.log(req.url)

    //? FRONTEND tarafındaki arama için güncelleme
    //console.log(req.url.slice(0, 11))
    //?böyle baktık ve url arama metinne göre parçaladık 
    // console.log(path)
    const param = req.url.split('=').pop().toLowerCase().trim();
    //   console.log(param)

    // İD VARSA BURASI ÇALIŞACAK
    //!yola id eklenirse bir film gönder
    if (path === '/api/movies' && id) {
        //1json dosyasından filmleri al
        const data = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'))

        //2- urldeki id'ye karşılık gelen elemanı dizide ara
        const movie = data.find((i) => i.id == id)

        //3- eğerki film bulunursa clienta gönder
        if (movie) {
            return res.end(JSON.stringify(movie))
        }
        //return res.end(id + ' li filmin detayları')
        //4- eğer film bulunamazsa hata gönder
        res.statusCode = 400; //?res.writeHead(404) bu da aynı
        return res.end(
            JSON.stringify({ message: 'Aranılan film bulunamadı' })
        )
    }
    // İD YOKSA BURASI ÇALIŞACAK
    //! temel url'e istek atılırsa bütün filmleri gönder
    //? if (req.url === '/api/movies')frontend güncellemesi
    if (path === '/api/movies') {
        //1) json dosyasından filmleri al
        const movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'))

        //2) client'a cevap gönder
        if (param && param !== '/api/movies') {
            //eğer parametre varsa ve /api/moviese eşit değilse filtrelenmiş filmeri gönder
            const filtred = movies.filter((movie) =>
                movie.title.toLowerCase().includes(param)
            )
            return res.end(JSON.stringify(filtred))
        }
        return res.end(JSON.stringify(movies))
        //return res.end('Bütün Filmler')
    }

    //! yol yanlışsa hata gönder
    res.statusCode = 404
    res.end(JSON.stringify({ message: 'Yol bulunamadı' })
    );

    // const url = '/api/movie';//'consolda görünen url ve id 
    // const id= '5'



    // res.end('Get isteği algılandı')
}
module.exports = getRequest;