export interface Service {
  id: string;
  title: string;
  description: string;
  details: string;
  icon?: string;
}

export const services: Service[] = [
  {
    id: "apres-vente",
    title: "Service après-vente",
    description: "Maintenance et réparation de véhicules BMW agréée par Ben Jemâa Motors.",
    details: "Le service après-vente Baccouche Automobiles est l'unique service de maintenance et réparation de véhicule BMW en Tunisie agréé par Ben Jemâa Motors. Nos équipes reçoivent régulièrement des formations spécifiques afin de toujours rester à la pointe des dernières techniques de réparation et maintenance mises en place par le groupe BMW AG. En confiant votre véhicule BMW à réparer chez Baccouche Automobiles, vous le remettez entre les mains de nos experts qui le traiteront conformément aux normes de qualité et spécifications les plus strictes imposées par le constructeur.",
  },
  {
    id: "garantie",
    title: "Garantie 2+3",
    description: "Programme de garantie étendue pour une tranquillité d'esprit totale.",
    details: "La garantie 2+3 BMW vous offre une couverture étendue au-delà de la garantie constructeur standard. Ce programme assure la protection de votre véhicule et vous permet de rouler l'esprit tranquille.",
  },
  {
    id: "premium-selection",
    title: "BMW Premium Selection / Véhicule d'occasion",
    description: "Véhicules d'occasion certifiés BMW, contrôlés et garantis.",
    details: "BMW Premium Selection propose une sélection de véhicules d'occasion rigoureusement contrôlés selon les critères BMW. Chaque véhicule bénéficie d'une inspection complète et d'une garantie pour votre sérénité.",
  },
];
