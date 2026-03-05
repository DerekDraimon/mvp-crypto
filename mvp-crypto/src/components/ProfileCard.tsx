import '../styles/ProfileCard.css';

interface ProfileCardProps {
  avatar: string;
  name: string;
  role: string;
  buttonText?: string;
}

const ProfileCard = ({ avatar, name, role, buttonText = 'Sígueme' }: ProfileCardProps) => {
  return (
    <article className="profile-card">
      <div className="card_avatar">
        <span role="img" aria-label={name}>{avatar}</span>
      </div>
      <div className="card_info">
        <h2 className="card_nombre">{name}</h2>
        <p className="card_rol">{role}</p>
      </div>
      <button className="card_boton" type="button">
        {buttonText}
      </button>
    </article>
  );
};

export default ProfileCard;
