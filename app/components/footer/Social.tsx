interface SocialItem {
  icon: string;
  link: string
}

const socialItems: SocialItem[] = [
  { icon: "fab fa-twitter", link: "https://x.com/NebulaInfra"},
  { icon: "fab fa-telegram-plane", link: "https://t.me/+HzUvFDkRSuJjOWUx" },
  { icon: "icon-fl-vt", link:"" },
  { icon: "fab fa-github", link:"https://github.com/Nebula-Marketplace/"}
];

export default function Social() {
  return (
    <>
      {socialItems.map((item, index) => (
        <li key={index}>
          <a href={item.link} target="{_blank}" rel="noopener noreferrer">
            <i className={item.icon} />
          </a>
        </li>
      ))}
    </>
  );
}
