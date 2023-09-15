export default function rupiahFormat(value) {
    return `Rp. ${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}