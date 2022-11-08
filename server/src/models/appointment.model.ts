import {
    BelongsToManyAddAssociationMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManyRemoveAssociationMixin,
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from 'sequelize';
import { AppointmentsServices } from './appointments-services.model';
import { Factor } from './factor.model';
import { Service } from './service.model';
import { User } from './user.model';
import { sequelizeInstance } from '../services';

export class Appointment extends Model<InferAttributes<Appointment>, InferCreationAttributes<Appointment>> {
    declare id: CreationOptional<string>;
    declare confirmed: CreationOptional<boolean>;
    declare estimatedPrice: Date | null;
    declare startsAt: Date | null;

    declare userId: ForeignKey<User['id']>;

    declare services: NonAttribute<Service[]>;
    declare factors: NonAttribute<Factor[]>;

    declare addService: BelongsToManyAddAssociationMixin<Service, string>;
    declare hasService: BelongsToManyHasAssociationMixin<Service, string>;
    declare removeService: BelongsToManyRemoveAssociationMixin<Service, string>;
}

Appointment.init(
    {
        id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4 },
        confirmed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        estimatedPrice: { type: DataTypes.FLOAT },
        startsAt: { type: DataTypes.DATE },
    },
    { sequelize: sequelizeInstance, tableName: 'appointments', timestamps: false }
);

Appointment.belongsToMany(Service, {
    through: AppointmentsServices,
    foreignKey: 'appointmentId',
    timestamps: false,
});
Service.belongsToMany(Appointment, {
    through: AppointmentsServices,
    foreignKey: 'serviceId',
    timestamps: false,
});

Appointment.hasMany(Factor, { foreignKey: 'appointmentId' });
Factor.belongsTo(Appointment, { foreignKey: 'appointmentId' });
