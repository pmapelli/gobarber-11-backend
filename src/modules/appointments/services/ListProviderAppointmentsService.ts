import { injectable, inject } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<Appointment[]> {
    const cacheData = await this.cacheProvider.recover('chave');

    console.log(cacheData);

    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      { provider_id, month, year, day },
    );

    // await this.cacheProvider.save('chave', 'conteudo');

    return appointments;
  }
}

export default ListProviderAppointmentsService;
