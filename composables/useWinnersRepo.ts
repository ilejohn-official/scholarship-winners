import WinnersRepository from '~/repository/winners';

export default function (): WinnersRepository {
  return new WinnersRepository($fetch);
}
