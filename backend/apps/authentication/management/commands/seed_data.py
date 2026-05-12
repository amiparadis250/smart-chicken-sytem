import random
from datetime import timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone
from apps.authentication.models import User
from apps.farms.models import Farm
from apps.devices.models import Device
from apps.sensors.models import SensorData
from apps.detections.models import Detection
from apps.alerts.models import Alert


class Command(BaseCommand):
    help = 'Seed database with demo data'

    def add_arguments(self, parser):
        parser.add_argument('--flush', action='store_true', help='Clear existing data before seeding')

    def handle(self, *args, **options):
        seed_emails = ['admin@scfs.tech', 'jean@farm.rw', 'alice@farm.rw', 'patrick@farm.rw']

        if options['flush']:
            self.stdout.write('Flushing existing seed data...')
            seed_users = User.objects.filter(email__in=seed_emails)
            seed_farms = Farm.objects.filter(owner__in=seed_users)
            Alert.objects.filter(farm__in=seed_farms).delete()
            Detection.objects.filter(farm__in=seed_farms).delete()
            SensorData.objects.filter(farm__in=seed_farms).delete()
            Device.objects.filter(farm__in=seed_farms).delete()
            seed_farms.delete()
            seed_users.delete()

        self.stdout.write('Seeding database...')

        # Users
        admin, created = User.objects.get_or_create(
            email='admin@scfs.tech',
            defaults={
                'username': 'admin',
                'first_name': 'Admin',
                'last_name': 'SCFS',
                'farm_name': 'SCFS HQ',
                'is_farmer': False,
                'is_staff': True,
                'is_superuser': True,
            }
        )
        admin.set_password('admin123')
        admin.save()

        farmers = []
        farmer_data = [
            ('jean@farm.rw', 'jean', 'Jean', 'Mugabo', 'Mugabo Poultry Farm'),
            ('alice@farm.rw', 'alice', 'Alice', 'Uwimana', 'Uwimana Chicken Ranch'),
            ('patrick@farm.rw', 'patrick', 'Patrick', 'Niyonzima', 'Niyonzima Livestock'),
        ]
        for email, username, first, last, farm_name in farmer_data:
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'username': username,
                    'first_name': first,
                    'last_name': last,
                    'farm_name': farm_name,
                    'phone_number': f'+25078{random.randint(1000000, 9999999)}',
                }
            )
            user.set_password('farmer123')
            user.save()
            farmers.append(user)

        self.stdout.write(f'  Created {len(farmers) + 1} users')

        # Farms
        farms = []
        farm_configs = [
            (farmers[0], 'Mugabo Poultry Farm', 'Nyarugenge, Kigali', 1200),
            (farmers[0], 'Mugabo Extension Site', 'Gasabo, Kigali', 800),
            (farmers[1], 'Uwimana Chicken Ranch', 'Huye, Southern Province', 2000),
            (farmers[2], 'Niyonzima Livestock', 'Musanze, Northern Province', 500),
        ]
        for owner, name, location, chickens in farm_configs:
            farm = Farm.objects.create(
                owner=owner, name=name, location=location, total_chickens=chickens,
                description=f'{name} - automated monitoring enabled',
            )
            farms.append(farm)

        self.stdout.write(f'  Created {len(farms)} farms')

        # Devices
        devices = []
        for farm in farms:
            for i in range(2):
                cam = Device.objects.create(
                    farm=farm, name=f'Camera {i+1} - {farm.name[:10]}',
                    device_type='camera',
                    serial_number=f'CAM-{farm.id:03d}-{i+1:02d}-{random.randint(1000,9999)}',
                    last_ping=timezone.now() - timedelta(minutes=random.randint(0, 30)),
                )
                devices.append(cam)
            sensor = Device.objects.create(
                farm=farm, name=f'Sensor Hub - {farm.name[:10]}',
                device_type='sensor',
                serial_number=f'SNS-{farm.id:03d}-01-{random.randint(1000,9999)}',
                last_ping=timezone.now() - timedelta(minutes=random.randint(0, 10)),
            )
            devices.append(sensor)

        self.stdout.write(f'  Created {len(devices)} devices')

        # Sensor Data (last 7 days, every 30 min)
        now = timezone.now()
        sensor_records = []
        for farm in farms:
            sensor_device = Device.objects.filter(farm=farm, device_type='sensor').first()
            for hours_ago in range(0, 168, 1):  # 7 days hourly
                temp = round(random.uniform(20, 34), 1)
                humidity = round(random.uniform(45, 78), 1)
                gas = round(random.uniform(10, 55), 1)
                sensor_records.append(SensorData(
                    farm=farm, device=sensor_device,
                    temperature=temp, humidity=humidity, gas_level=gas,
                ))
        SensorData.objects.bulk_create(sensor_records)
        self.stdout.write(f'  Created {len(sensor_records)} sensor readings')

        # Detections (last 3 days)
        detection_records = []
        for farm in farms:
            cam = Device.objects.filter(farm=farm, device_type='camera').first()
            for i in range(random.randint(20, 50)):
                status = random.choices(['healthy', 'abnormal'], weights=[85, 15])[0]
                confidence = round(random.uniform(0.75, 0.99), 2) if status == 'healthy' else round(random.uniform(0.60, 0.92), 2)
                detection_records.append(Detection(
                    farm=farm, device=cam,
                    status=status, confidence=confidence,
                    notes='Automated AI scan' if status == 'healthy' else 'Abnormal posture/behavior detected',
                ))
        Detection.objects.bulk_create(detection_records)
        self.stdout.write(f'  Created {len(detection_records)} detections')

        # Alerts
        alert_records = []
        severities = ['low', 'medium', 'high', 'critical']
        messages_sensor = [
            'Temperature too high: 36.2°C',
            'Humidity too low: 38%',
            'Gas level too high: 58 ppm',
            'Temperature too low: 16.5°C',
            'Humidity too high: 82%',
        ]
        messages_ai = [
            'Abnormal chicken behavior detected in Zone A',
            'Possible respiratory distress identified',
            'Unusual clustering pattern — potential disease spread',
            'Mortality event detected by camera',
            'Low activity level — possible illness',
        ]

        for farm in farms:
            for i in range(random.randint(5, 15)):
                alert_type = random.choice(['sensor', 'ai'])
                msg = random.choice(messages_sensor if alert_type == 'sensor' else messages_ai)
                alert_records.append(Alert(
                    farm=farm,
                    alert_type=alert_type,
                    severity=random.choice(severities),
                    message=msg,
                    is_resolved=random.choice([True, True, False]),
                ))
        Alert.objects.bulk_create(alert_records)
        self.stdout.write(f'  Created {len(alert_records)} alerts')

        self.stdout.write(self.style.SUCCESS('\nSeeding complete!'))
        self.stdout.write(self.style.SUCCESS('Login credentials:'))
        self.stdout.write(f'  Admin:  admin@scfs.tech / admin123')
        self.stdout.write(f'  Farmer: jean@farm.rw / farmer123')
        self.stdout.write(f'  Farmer: alice@farm.rw / farmer123')
        self.stdout.write(f'  Farmer: patrick@farm.rw / farmer123')
