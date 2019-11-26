<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('countries')->delete();
  		$countries = array(
  			array('ISO' => 'US', 'name' => 'United States'),
  			array('ISO' => 'CA', 'name' => 'Canada'),
  			array('ISO' => 'AF', 'name' => 'Afghanistan'),
  			array('ISO' => 'AL', 'name' => 'Albania'),
  			array('ISO' => 'DZ', 'name' => 'Algeria'),
  			array('ISO' => 'AS', 'name' => 'American Samoa'),
  			array('ISO' => 'AD', 'name' => 'Andorra'),
  			array('ISO' => 'AO', 'name' => 'Angola'),
  			array('ISO' => 'AI', 'name' => 'Anguilla'),
  			array('ISO' => 'AQ', 'name' => 'Antarctica'),
  			array('ISO' => 'AG', 'name' => 'Antigua and/or Barbuda'),
  			array('ISO' => 'AR', 'name' => 'Argentina'),
  			array('ISO' => 'AM', 'name' => 'Armenia'),
  			array('ISO' => 'AW', 'name' => 'Aruba'),
  			array('ISO' => 'AU', 'name' => 'Australia'),
  			array('ISO' => 'AT', 'name' => 'Austria'),
  			array('ISO' => 'AZ', 'name' => 'Azerbaijan'),
  			array('ISO' => 'BS', 'name' => 'Bahamas'),
  			array('ISO' => 'BH', 'name' => 'Bahrain'),
  			array('ISO' => 'BD', 'name' => 'Bangladesh'),
  			array('ISO' => 'BB', 'name' => 'Barbados'),
  			array('ISO' => 'BY', 'name' => 'Belarus'),
  			array('ISO' => 'BE', 'name' => 'Belgium'),
  			array('ISO' => 'BZ', 'name' => 'Belize'),
  			array('ISO' => 'BJ', 'name' => 'Benin'),
  			array('ISO' => 'BM', 'name' => 'Bermuda'),
  			array('ISO' => 'BT', 'name' => 'Bhutan'),
  			array('ISO' => 'BO', 'name' => 'Bolivia'),
  			array('ISO' => 'BA', 'name' => 'Bosnia and Herzegovina'),
  			array('ISO' => 'BW', 'name' => 'Botswana'),
  			array('ISO' => 'BV', 'name' => 'Bouvet Island'),
  			array('ISO' => 'BR', 'name' => 'Brazil'),
  			array('ISO' => 'IO', 'name' => 'British lndian Ocean Territory'),
  			array('ISO' => 'BN', 'name' => 'Brunei Darussalam'),
  			array('ISO' => 'BG', 'name' => 'Bulgaria'),
  			array('ISO' => 'BF', 'name' => 'Burkina Faso'),
  			array('ISO' => 'BI', 'name' => 'Burundi'),
  			array('ISO' => 'KH', 'name' => 'Cambodia'),
  			array('ISO' => 'CM', 'name' => 'Cameroon'),
  			array('ISO' => 'CV', 'name' => 'Cape Verde'),
  			array('ISO' => 'KY', 'name' => 'Cayman Islands'),
  			array('ISO' => 'CF', 'name' => 'Central African Republic'),
  			array('ISO' => 'TD', 'name' => 'Chad'),
  			array('ISO' => 'CL', 'name' => 'Chile'),
  			array('ISO' => 'CN', 'name' => 'China'),
  			array('ISO' => 'CX', 'name' => 'Christmas Island'),
  			array('ISO' => 'CC', 'name' => 'Cocos (Keeling) Islands'),
  			array('ISO' => 'CO', 'name' => 'Colombia'),
  			array('ISO' => 'KM', 'name' => 'Comoros'),
  			array('ISO' => 'CG', 'name' => 'Congo'),
  			array('ISO' => 'CK', 'name' => 'Cook Islands'),
  			array('ISO' => 'CR', 'name' => 'Costa Rica'),
  			array('ISO' => 'HR', 'name' => 'Croatia (Hrvatska)'),
  			array('ISO' => 'CU', 'name' => 'Cuba'),
  			array('ISO' => 'CY', 'name' => 'Cyprus'),
  			array('ISO' => 'CZ', 'name' => 'Czech Republic'),
  			array('ISO' => 'CD', 'name' => 'Democratic Republic of Congo'),
  			array('ISO' => 'DK', 'name' => 'Denmark'),
  			array('ISO' => 'DJ', 'name' => 'Djibouti'),
  			array('ISO' => 'DM', 'name' => 'Dominica'),
  			array('ISO' => 'DO', 'name' => 'Dominican Republic'),
  			array('ISO' => 'TP', 'name' => 'East Timor'),
  			array('ISO' => 'EC', 'name' => 'Ecudaor'),
  			array('ISO' => 'EG', 'name' => 'Egypt'),
  			array('ISO' => 'SV', 'name' => 'El Salvador'),
  			array('ISO' => 'GQ', 'name' => 'Equatorial Guinea'),
  			array('ISO' => 'ER', 'name' => 'Eritrea'),
  			array('ISO' => 'EE', 'name' => 'Estonia'),
  			array('ISO' => 'ET', 'name' => 'Ethiopia'),
  			array('ISO' => 'FK', 'name' => 'Falkland Islands (Malvinas)'),
  			array('ISO' => 'FO', 'name' => 'Faroe Islands'),
  			array('ISO' => 'FJ', 'name' => 'Fiji'),
  			array('ISO' => 'FI', 'name' => 'Finland'),
  			array('ISO' => 'FR', 'name' => 'France'),
  			array('ISO' => 'FX', 'name' => 'France, Metropolitan'),
  			array('ISO' => 'GF', 'name' => 'French Guiana'),
  			array('ISO' => 'PF', 'name' => 'French Polynesia'),
  			array('ISO' => 'TF', 'name' => 'French Southern Territories'),
  			array('ISO' => 'GA', 'name' => 'Gabon'),
  			array('ISO' => 'GM', 'name' => 'Gambia'),
  			array('ISO' => 'GE', 'name' => 'Georgia'),
  			array('ISO' => 'DE', 'name' => 'Germany'),
  			array('ISO' => 'GH', 'name' => 'Ghana'),
  			array('ISO' => 'GI', 'name' => 'Gibraltar'),
  			array('ISO' => 'GR', 'name' => 'Greece'),
  			array('ISO' => 'GL', 'name' => 'Greenland'),
  			array('ISO' => 'GD', 'name' => 'Grenada'),
  			array('ISO' => 'GP', 'name' => 'Guadeloupe'),
  			array('ISO' => 'GU', 'name' => 'Guam'),
  			array('ISO' => 'GT', 'name' => 'Guatemala'),
  			array('ISO' => 'GN', 'name' => 'Guinea'),
  			array('ISO' => 'GW', 'name' => 'Guinea-Bissau'),
  			array('ISO' => 'GY', 'name' => 'Guyana'),
  			array('ISO' => 'HT', 'name' => 'Haiti'),
  			array('ISO' => 'HM', 'name' => 'Heard and Mc Donald Islands'),
  			array('ISO' => 'HN', 'name' => 'Honduras'),
  			array('ISO' => 'HK', 'name' => 'Hong Kong'),
  			array('ISO' => 'HU', 'name' => 'Hungary'),
  			array('ISO' => 'IS', 'name' => 'Iceland'),
  			array('ISO' => 'IN', 'name' => 'India'),
  			array('ISO' => 'ID', 'name' => 'Indonesia'),
  			array('ISO' => 'IR', 'name' => 'Iran (Islamic Republic of)'),
  			array('ISO' => 'IQ', 'name' => 'Iraq'),
  			array('ISO' => 'IE', 'name' => 'Ireland'),
  			array('ISO' => 'IL', 'name' => 'Israel'),
  			array('ISO' => 'IT', 'name' => 'Italy'),
  			array('ISO' => 'CI', 'name' => 'Ivory Coast'),
  			array('ISO' => 'JM', 'name' => 'Jamaica'),
  			array('ISO' => 'JP', 'name' => 'Japan'),
  			array('ISO' => 'JO', 'name' => 'Jordan'),
  			array('ISO' => 'KZ', 'name' => 'Kazakhstan'),
  			array('ISO' => 'KE', 'name' => 'Kenya'),
  			array('ISO' => 'KI', 'name' => 'Kiribati'),
  			array('ISO' => 'KP', 'name' => 'Korea, Democratic People\'s Republic of'),
  			array('ISO' => 'KR', 'name' => 'Korea, Republic of'),
  			array('ISO' => 'KW', 'name' => 'Kuwait'),
  			array('ISO' => 'KG', 'name' => 'Kyrgyzstan'),
  			array('ISO' => 'LA', 'name' => 'Lao People\'s Democratic Republic'),
  			array('ISO' => 'LV', 'name' => 'Latvia'),
  			array('ISO' => 'LB', 'name' => 'Lebanon'),
  			array('ISO' => 'LS', 'name' => 'Lesotho'),
  			array('ISO' => 'LR', 'name' => 'Liberia'),
  			array('ISO' => 'LY', 'name' => 'Libyan Arab Jamahiriya'),
  			array('ISO' => 'LI', 'name' => 'Liechtenstein'),
  			array('ISO' => 'LT', 'name' => 'Lithuania'),
  			array('ISO' => 'LU', 'name' => 'Luxembourg'),
  			array('ISO' => 'MO', 'name' => 'Macau'),
  			array('ISO' => 'MK', 'name' => 'Macedonia'),
  			array('ISO' => 'MG', 'name' => 'Madagascar'),
  			array('ISO' => 'MW', 'name' => 'Malawi'),
  			array('ISO' => 'MY', 'name' => 'Malaysia'),
  			array('ISO' => 'MV', 'name' => 'Maldives'),
  			array('ISO' => 'ML', 'name' => 'Mali'),
  			array('ISO' => 'MT', 'name' => 'Malta'),
  			array('ISO' => 'MH', 'name' => 'Marshall Islands'),
  			array('ISO' => 'MQ', 'name' => 'Martinique'),
  			array('ISO' => 'MR', 'name' => 'Mauritania'),
  			array('ISO' => 'MU', 'name' => 'Mauritius'),
  			array('ISO' => 'TY', 'name' => 'Mayotte'),
  			array('ISO' => 'MX', 'name' => 'Mexico'),
  			array('ISO' => 'FM', 'name' => 'Micronesia, Federated States of'),
  			array('ISO' => 'MD', 'name' => 'Moldova, Republic of'),
  			array('ISO' => 'MC', 'name' => 'Monaco'),
  			array('ISO' => 'MN', 'name' => 'Mongolia'),
  			array('ISO' => 'MS', 'name' => 'Montserrat'),
  			array('ISO' => 'MA', 'name' => 'Morocco'),
  			array('ISO' => 'MZ', 'name' => 'Mozambique'),
  			array('ISO' => 'MM', 'name' => 'Myanmar'),
  			array('ISO' => 'NA', 'name' => 'Namibia'),
  			array('ISO' => 'NR', 'name' => 'Nauru'),
  			array('ISO' => 'NP', 'name' => 'Nepal'),
  			array('ISO' => 'NL', 'name' => 'Netherlands'),
  			array('ISO' => 'AN', 'name' => 'Netherlands Antilles'),
  			array('ISO' => 'NC', 'name' => 'New Caledonia'),
  			array('ISO' => 'NZ', 'name' => 'New Zealand'),
  			array('ISO' => 'NI', 'name' => 'Nicaragua'),
  			array('ISO' => 'NE', 'name' => 'Niger'),
  			array('ISO' => 'NG', 'name' => 'Nigeria'),
  			array('ISO' => 'NU', 'name' => 'Niue'),
  			array('ISO' => 'NF', 'name' => 'Norfork Island'),
  			array('ISO' => 'MP', 'name' => 'Northern Mariana Islands'),
  			array('ISO' => 'NO', 'name' => 'Norway'),
  			array('ISO' => 'OM', 'name' => 'Oman'),
  			array('ISO' => 'PK', 'name' => 'Pakistan'),
  			array('ISO' => 'PW', 'name' => 'Palau'),
  			array('ISO' => 'PA', 'name' => 'Panama'),
  			array('ISO' => 'PG', 'name' => 'Papua New Guinea'),
  			array('ISO' => 'PY', 'name' => 'Paraguay'),
  			array('ISO' => 'PE', 'name' => 'Peru'),
  			array('ISO' => 'PH', 'name' => 'Philippines'),
  			array('ISO' => 'PN', 'name' => 'Pitcairn'),
  			array('ISO' => 'PL', 'name' => 'Poland'),
  			array('ISO' => 'PT', 'name' => 'Portugal'),
  			array('ISO' => 'PR', 'name' => 'Puerto Rico'),
  			array('ISO' => 'QA', 'name' => 'Qatar'),
  			array('ISO' => 'SS', 'name' => 'Republic of South Sudan'),
  			array('ISO' => 'RE', 'name' => 'Reunion'),
  			array('ISO' => 'RO', 'name' => 'Romania'),
  			array('ISO' => 'RU', 'name' => 'Russian Federation'),
  			array('ISO' => 'RW', 'name' => 'Rwanda'),
  			array('ISO' => 'KN', 'name' => 'Saint Kitts and Nevis'),
  			array('ISO' => 'LC', 'name' => 'Saint Lucia'),
  			array('ISO' => 'VC', 'name' => 'Saint Vincent and the Grenadines'),
  			array('ISO' => 'WS', 'name' => 'Samoa'),
  			array('ISO' => 'SM', 'name' => 'San Marino'),
  			array('ISO' => 'ST', 'name' => 'Sao Tome and Principe'),
  			array('ISO' => 'SA', 'name' => 'Saudi Arabia'),
  			array('ISO' => 'SN', 'name' => 'Senegal'),
  			array('ISO' => 'RS', 'name' => 'Serbia'),
  			array('ISO' => 'SC', 'name' => 'Seychelles'),
  			array('ISO' => 'SL', 'name' => 'Sierra Leone'),
  			array('ISO' => 'SG', 'name' => 'Singapore'),
  			array('ISO' => 'SK', 'name' => 'Slovakia'),
  			array('ISO' => 'SI', 'name' => 'Slovenia'),
  			array('ISO' => 'SB', 'name' => 'Solomon Islands'),
  			array('ISO' => 'SO', 'name' => 'Somalia'),
  			array('ISO' => 'ZA', 'name' => 'South Africa'),
  			array('ISO' => 'GS', 'name' => 'South Georgia South Sandwich Islands'),
  			array('ISO' => 'ES', 'name' => 'Spain'),
  			array('ISO' => 'LK', 'name' => 'Sri Lanka'),
  			array('ISO' => 'SH', 'name' => 'St. Helena'),
  			array('ISO' => 'PM', 'name' => 'St. Pierre and Miquelon'),
  			array('ISO' => 'SD', 'name' => 'Sudan'),
  			array('ISO' => 'SR', 'name' => 'Suriname'),
  			array('ISO' => 'SJ', 'name' => 'Svalbarn and Jan Mayen Islands'),
  			array('ISO' => 'SZ', 'name' => 'Swaziland'),
  			array('ISO' => 'SE', 'name' => 'Sweden'),
  			array('ISO' => 'CH', 'name' => 'Switzerland'),
  			array('ISO' => 'SY', 'name' => 'Syrian Arab Republic'),
  			array('ISO' => 'TW', 'name' => 'Taiwan'),
  			array('ISO' => 'TJ', 'name' => 'Tajikistan'),
  			array('ISO' => 'TZ', 'name' => 'Tanzania, United Republic of'),
  			array('ISO' => 'TH', 'name' => 'Thailand'),
  			array('ISO' => 'TG', 'name' => 'Togo'),
  			array('ISO' => 'TK', 'name' => 'Tokelau'),
  			array('ISO' => 'TO', 'name' => 'Tonga'),
  			array('ISO' => 'TT', 'name' => 'Trinidad and Tobago'),
  			array('ISO' => 'TN', 'name' => 'Tunisia'),
  			array('ISO' => 'TR', 'name' => 'Turkey'),
  			array('ISO' => 'TM', 'name' => 'Turkmenistan'),
  			array('ISO' => 'TC', 'name' => 'Turks and Caicos Islands'),
  			array('ISO' => 'TV', 'name' => 'Tuvalu'),
  			array('ISO' => 'UG', 'name' => 'Uganda'),
  			array('ISO' => 'UA', 'name' => 'Ukraine'),
  			array('ISO' => 'AE', 'name' => 'United Arab Emirates'),
  			array('ISO' => 'GB', 'name' => 'United Kingdom'),
  			array('ISO' => 'UM', 'name' => 'United States minor outlying islands'),
  			array('ISO' => 'UY', 'name' => 'Uruguay'),
  			array('ISO' => 'UZ', 'name' => 'Uzbekistan'),
  			array('ISO' => 'VU', 'name' => 'Vanuatu'),
  			array('ISO' => 'VA', 'name' => 'Vatican City State'),
  			array('ISO' => 'VE', 'name' => 'Venezuela'),
  			array('ISO' => 'VN', 'name' => 'Vietnam'),
  			array('ISO' => 'VG', 'name' => 'Virgin Islands (British)'),
  			array('ISO' => 'VI', 'name' => 'Virgin Islands (U.S.)'),
  			array('ISO' => 'WF', 'name' => 'Wallis and Futuna Islands'),
  			array('ISO' => 'EH', 'name' => 'Western Sahara'),
  			array('ISO' => 'YE', 'name' => 'Yemen'),
  			array('ISO' => 'YU', 'name' => 'Yugoslavia'),
  			array('ISO' => 'ZR', 'name' => 'Zaire'),
  			array('ISO' => 'ZM', 'name' => 'Zambia'),
  			array('ISO' => 'ZW', 'name' => 'Zimbabwe'),
  		);
  		DB::table('countries')->insert($countries);
    }
}
