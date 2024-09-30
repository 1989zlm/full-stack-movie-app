//! isteğin body kısmındaki veriye erişebilmek için parça parça gelen byteları birleştirip fonksiyonun çağrıldığı yere return et.

const bodyParser = async (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';

            //frontend'den body'nin her parçası geldiğinde onu al ve yukarıdaki stringe ekle
            //? her data yani her bir parça geldiğinde bu fonk. çalışsın(parçaya chunk dedik)
            req.on('data', (chunk) => {
                body += chunk;
            })
            //yükleme - istek bittiğinde json verisini js verisine çevir

            req.on('end', () => {
                // fonksiyonun çağrıldığı yere body içeriğini return et
                resolve(JSON.parse(body));
                //  console.log(body)
            })
        } catch (err) {
            //hata oluşursa hatayı döndür
            reject(err);

        }
    })
}

module.exports = bodyParser;