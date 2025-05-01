export const PokemonCards = ({ pokemonData }) => {
  const { id, name, sprites, types } = pokemonData;

  return (
    <li className="pokemon-card">
      <figure>
        <img
          className="pokemon-image"
          src={sprites?.other?.["official-artwork"]?.front_default}
          alt={name}
        />
      </figure>
      <p className="pokemon-name">{name}</p>
      <div className="pokemon-highlight">
        {types.map((typeInfo) => (
          <p key={typeInfo.slot} className={`type-badge ${typeInfo.type.name}`}>
            {typeInfo.type.name}
          </p>
        ))}
      </div>

      <p className="pokemon-id">ID: #{id}</p>
    </li>
  );
};
