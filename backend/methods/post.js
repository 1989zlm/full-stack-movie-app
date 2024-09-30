const bodyParser = require('../utils/bodyParser')
const crypto = require('crypto')
const fs = require('fs')

const keys =[
    "title",
    "year",
    "rating",
    "description",
    "language",
    "director",
]

const postRequest = async (req, res) => {
    //!filmi oluştur
    if (req.url === '/api/movies') {
        //isteğin body kısmına eriş=>burada karışır utils dosyasonda bodyparser açtık
       const body= await bodyParser(req);
       console.log('Boddydydyd',body)

       //! gelen veriyi control et
     //  console.log('gelen body', body)
             
        if(
            keys.some((key)=>!body[key]) ||
            !body.genre.length > 0 || 
            !body.cast.length > 0
        ) {
          res.writeHead(404);
          res.end('Lütfen zorunlu olan bütün alanları tanımlayınız');
        return 
        }


        // kaydedilecek filme id ekle (uniq id)
        body.id = crypto.randomUUID();

        //json dosyasından verileri al
        let data = fs.readFileSync('./data/movies.json', 'utf-8')
        data= JSON.parse(data)


        // mavcut filmlerin üzerine  yeni film ekle
        data.push(body)

        //json dosyasını güncelle
        fs.writeFileSync('./data/movies.json', JSON.stringify(data))

        //client cevap gönder
        //res.end('film oluşturuldu')
        res.end(JSON.stringify(body))
         } else {
        res.writeHead(201);
        res.end('Geçersiz yola istek atıldı')
         }

        //  res.end('Post isteği algılandı')
}

module.exports = postRequest;
console.log(crypto.randomUUID())

//GELEN CEVABI İNCELE //EKSİK VARSA HATA GÖNDER //VERİ DOĞRUYSA DİZİYE EKLE //JSON DOSYASINI GÜNCELLE //CEVAP GÖNDER

// {
  
//     "title": "Esaretin Bedeli",
//     "year": "1994",
//     "genre": ["Dram", "Suç"],
//     "rating": "9.3",
//     "description": "Haksız yere müebbet hapse mahkum edilen bir adamın, hapishanedeki dostlukları ve kaçış planını konu alan bir film.",
//     "director": "Frank Darabont",
//     "cast": ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
//     "duration": "2s 22dk",
//     "language": "İngilizce"
//   }