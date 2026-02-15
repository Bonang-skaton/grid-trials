   document.addEventListener('alpine:init', () => {
        Alpine.data('products', () => ({
           items: [
            { id: 1, name: 'Bergo Rubi bahan kaos', img: '1.png', price: 5000 },
            { id: 2, name: 'Sosis Bakar isi 2 pcs', img: '2.png', price: 70000 },
            { id: 3, name: 'Es Teh Manis', img: '3.png', price: 3000 },
            { id: 4, name: 'Bakso Komplit isi 5 pcs', img: '4.png', price: 10000 },
            { id: 5, name: 'Bakpau Mini isi 5 pcs', img: '5.png', price: 5000 },
            { id: 6, name: 'Shoestring Fries 1 kg', img: '6.png', price: 3000 },
            { id: 7, name: 'Bakso Aci Isi 6 Pentol', img: '7.png', price: 5000 },
            { id: 8, name: 'So eco nugget uk 1kg', img: '8.png', price: 38000 },
            { id: 9, name: 'Es Nutrisari', img: '9.png', price: 1000 },
            { id: 10, name: 'Pempek Palembang Isi 20 pcs', img: '10.png', price: 35000 },
            { id: 11, name: 'nugget champ 225 gr', img: '11.png', price: 20000 },
            { id: 12, name: 'chicken nugget ABC 250 gr', img: '12.png', price: 22000 },
            { id: 13, name: 'sosis champ 15 pcs', img: '13.png', price: 20000 },
            { id: 14, name: 'Cireng Rujak Isi 20 pcs', img: '14.png', price: 15000 },
            { id: 15, name: 'Dimsum homemade Frozen Isi 10 pcs', img: '15.png', price: 25000 },
            { id: 16, name: 'Bakso Kecil Home Made isi 70 pcs', img: '16.jpg', price: 35000 },
            { id: 17, name: 'Bakpau Mini Isi 30 pcs', img: '17.png', price: 20000 },
            { id: 18, name: 'Otak-Otak 1 kg', img: '18.png', price: 20000 },
            { id: 19, name: 'Fish rool 250 gr', img: '19.png', price: 17000 },
           ],
        }));

      Alpine.store('cart', {
         items: [],
         total: 0,
         quantity: 0,
         add(newItem) {
            // untuk cek apakah item sudah ada di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);
            if(!cartItem) {
               this.items.push({...newItem, quantity: 1, total: newItem.price });
               this.quantity++;
               this.total += newItem.price;

            } else {
               this.items = this.items.map((item) => {
                 if (item.id !== newItem.id) {
                     return item;
                 } else {
                     item.quantity++;
                     item.total = item.price * item.quantity;
                     this.quantity++;
                     this.total += item.price;
                     return item;
                 }
               });
            }
         },

        remove(id) {
         const cartItem = this.items.find((item) => item.id === id);
         if (cartItem.quantity > 1) {
            this.items = this.items.map((item) => {
             if (item.id !== id) {
               return item;
             } else {
               item.quantity--;
               item.total = item.price * item.quantity;
               this.quantity--;
               this.total -= item.price;
               return item;
             }

            })

         } else if (cartItem.quantity === 1) {
            this.items = this.items.filter((item) => item.id !== id);
            this.quantity--;
            this.total -= cartItem.price;
         }
        },
     });
 });


// Buat tombol cekout 
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');

form.addEventListener('keyup', function() {
for(let i = 0; i < form.elements.length; i++) {
   if(form.elements[i].value !== 0) {
checkoutButton.classList.remove('disabled');
checkoutButton.classList.add('disabled');
   } else {
      return false;
   }
} 
checkoutButton.disabled = false;
checkoutButton.classList.remove('disabled');
});

// kirim data ketika tombol checkout di klik
checkoutButton.addEventListener('click', function(e) {
e.preventDefault();
const formData = new FormData(form);
const data = new URLSearchParams(formData);
const objData = Object.fromEntries(data);
const message = formatMessage(objData);
window.open('https://wa.me/628568084552?text=' + encodeURIComponent(message));
});

// format pesan whatsapp
const formatMessage = (obj) => {
   return`Pelanggan Online
   Nama: ${obj.name}
   No Hp: ${obj.phone}
   Alamat: ${obj.address}
   Pesanan Online
 ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`)}
 TOTAL: ${rupiah(obj.total)}
   Terimakasih`;

};



   //  kurs rupiah format terbaru
   const rupiah = (number) => {
      return new Intl.NumberFormat('id-ID', {
         style: 'currency',
         currency: 'IDR',
         minimumFractionDigits: 0,
      }).format(number);
   };
  