import json

with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

sql = []
sql.append('CREATE TABLE IF NOT EXISTS `company_info` (')
sql.append('  `id` int(11) NOT NULL AUTO_INCREMENT,')
sql.append('  `name` varchar(255) NOT NULL,')
sql.append('  `phone` varchar(50) NOT NULL,')
sql.append('  `email` varchar(255) NOT NULL,')
sql.append('  `address` varchar(255) NOT NULL,')
sql.append('  `slogan` text NOT NULL,')
sql.append('  `zalo` varchar(50) NOT NULL,')
sql.append('  PRIMARY KEY (`id`)')
sql.append(') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;')
sql.append('')
sql.append('INSERT INTO `company_info` (`id`, `name`, `phone`, `email`, `address`, `slogan`, `zalo`) VALUES')
sql.append("(1, 'TEMPLATESBDS', '0919006030', 'contact@templatesbds.com', 'Quận 9, TP. Thủ Đức, TP.HCM', 'Đại đô thị sinh thái Grand Riverside - Không gian sống chuẩn mực quốc tế.', '0919006030');")
sql.append('')

sql.append('CREATE TABLE IF NOT EXISTS `projects` (')
sql.append('  `id` int(11) NOT NULL AUTO_INCREMENT,')
sql.append('  `title` varchar(255) NOT NULL,')
sql.append('  `slug` varchar(255) NOT NULL,')
sql.append('  `category` varchar(50) NOT NULL,')
sql.append('  `categoryLabel` varchar(255) NOT NULL,')
sql.append('  `price` varchar(50) NOT NULL,')
sql.append('  `priceNum` float NOT NULL,')
sql.append('  `area` varchar(50) NOT NULL,')
sql.append('  `areaNum` float NOT NULL,')
sql.append('  `bedrooms` int(11) NOT NULL,')
sql.append('  `bathrooms` int(11) NOT NULL,')
sql.append('  `direction` varchar(50) NOT NULL,')
sql.append('  `location` varchar(255) NOT NULL,')
sql.append('  `zone` varchar(255) NOT NULL,')
sql.append('  `floor` varchar(50) NOT NULL,')
sql.append('  `badge` varchar(50) NOT NULL,')
sql.append('  `image` varchar(255) NOT NULL,')
sql.append('  `gallery` text NOT NULL,')
sql.append('  `specs` text NOT NULL,')
sql.append('  `amenities` text NOT NULL,')
sql.append('  `desc` text NOT NULL,')
sql.append('  `highlight` text NOT NULL,')
sql.append('  PRIMARY KEY (`id`)')
sql.append(') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;')

for p in data:
    def format_val(val):
        if isinstance(val, str):
            val = val.replace("'", "''")
            return f"'{val}'"
        elif isinstance(val, (int, float)):
            return str(val)
        else:
            val = json.dumps(val, ensure_ascii=False).replace("'", "''")
            return f"'{val}'"

    values = [
        format_val(p['id']),
        format_val(p['title']),
        format_val(p['slug']),
        format_val(p['category']),
        format_val(p['categoryLabel']),
        format_val(p['price']),
        format_val(p['priceNum']),
        format_val(p['area']),
        format_val(p['areaNum']),
        format_val(p['bedrooms']),
        format_val(p['bathrooms']),
        format_val(p['direction']),
        format_val(p['location']),
        format_val(p['zone']),
        format_val(p['floor']),
        format_val(p['badge']),
        format_val(p['image']),
        format_val(p['gallery']),
        format_val(p['specs']),
        format_val(p['amenities']),
        format_val(p['desc']),
        format_val(p['highlight'])
    ]
    v_sql = ', '.join(values)
    sql.append(f"INSERT INTO `projects` VALUES ({v_sql});")

with open('php/database.sql', 'w', encoding='utf-8') as f:
    f.write('\\n'.join(sql))
