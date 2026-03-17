import '../styles/Gallery.css';

interface GalleryItemProps {
  icon: string;
  year: string;
  title: string;
  price: string;
  detail: string;
  colorClass: 'item-rojo' | 'item-morado' | 'item-azul' | 'item-verde' | 'item-amarillo' | 'item-rosa';
}

const GalleryItem = ({ icon, year, title, price, detail, colorClass }: GalleryItemProps) => {
  return (
    <article className={`item ${colorClass}`}>
      <span className="item_icono">{icon}</span>
      <span className="item_anio">{year}</span>
      <h2 className="item_titulo">{title}</h2>
      <p className="item_precio">{price}</p>
      <p className="item_detalle">{detail}</p>
    </article>
  );
};

const items: GalleryItemProps[] = [
    {
      icon: "🌱",
      year: "2009",
      title: "Génesis",
      price: "$0.00",
      detail: "Satoshi Nakamoto mina el primer bloque de Bitcoin",
      colorClass: "item-rojo"
    },
    {
      icon: "⚖️",
      year: "2011",
      title: "Primera paridad",
      price: "$1.00",
      detail: "Bitcoin alcanza su primera paridad con el dólar",
      colorClass: "item-morado"
    },
    {
      icon: "🚀",
      year: "2013",
      title: "Primer boom",
      price: "$1,000",
      detail: "Bitcoin supera los $1,000 por primera vez",
      colorClass: "item-azul"
    },
    {
      icon: "🌍",
      year: "2017",
      title: "Euforia global",
      price: "$20,000",
      detail: "Máximo histórico que marcó la fiebre cripto mundial",
      colorClass: "item-verde"
    },
    {
      icon: "🏆",
      year: "2021",
      title: "Nuevo récord",
      price: "$69,000",
      detail: "Bitcoin rompe su ATH durante la adopción institucional",
      colorClass: "item-amarillo"
    },
    {
      icon: "🏦",
      year: "2024",
      title: "ETF aprobado",
      price: "$100,000+",
      detail: "La SEC aprueba el primer ETF de Bitcoin al contado",
      colorClass: "item-rosa"
    }
  ];

const Gallery = () => {
  return (
    <div className="galeria">
      {items.map((item, index) => (
        <GalleryItem key={index} {...item} />
      ))}
    </div>
  );
};

export default Gallery;
