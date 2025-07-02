
interface HeroBackgroundProps {
  imageUrl: string;
}

export const HeroBackground = ({ imageUrl }: HeroBackgroundProps) => {
  return (
    <>
      <img 
        src={imageUrl}
        alt="Piano showroom"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ maxWidth: 'none' }}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-black/40" />
    </>
  );
};
