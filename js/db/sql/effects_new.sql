DROP TABLE IF EXISTS effects_new;
CREATE TABLE effects_new ( id int NOT NULL primary key, id_type int, hole text, effect text, icon text, c1 text, c2 text, c3 text, c4 text, c5 text, c6 text );
INSERT INTO effects_new VALUES ('1', '1', 'Black Hole', 'Missile velocity', 'missile velocity.png', '15%', '22%', '29%', '36%', '43%', '50%');
INSERT INTO effects_new VALUES ('2', '1', 'Black Hole', 'Missile Explosion Velocity', 'missile explosion velocity.png', '30%', '44%', '58%', '72%', '86%', '100%');
INSERT INTO effects_new VALUES ('3', '1', 'Black Hole', 'Ship velocity', 'ship velocity.png', '30%', '44%', '58%', '72%', '86%', '100%');
INSERT INTO effects_new VALUES ('4', '1', 'Black Hole', 'Stasis Webifier Strength', 'stasis webifier strength.png', '-15%', '-22%', '-29%', '-36%', '-43%', '-50%');
INSERT INTO effects_new VALUES ('5', '1', 'Black Hole', 'Inertia', 'inertia.jpg', '15%', '22%', '29%', '36%', '43%', '50%');
INSERT INTO effects_new VALUES ('6', '1', 'Black Hole', 'Targeting range', 'targeting range.jpg', '30%', '44%', '58%', '72%', '86%', '100%');
INSERT INTO effects_new VALUES ('7', '2', 'Magnetar', 'Damage', 'damage.png', '30%', '44%', '58%', '72%', '86%', '100%');
INSERT INTO effects_new VALUES ('8', '2', 'Magnetar', 'Missile explosion radius', 'missile explosion velocity.png', '15%', '22%', '29%', '36%', '43%', '50%');
INSERT INTO effects_new VALUES ('9', '2', 'Magnetar', 'Drone Tracking', 'drone tracking.png', '-15%', '-22%', '-29%', '-36%', '-43%', '-50%');
INSERT INTO effects_new VALUES ('10', '2', 'Magnetar', 'Targeting Range', 'targeting range.jpg', '-15%', '-22%', '-29%', '-36%', '-43%', '-50%');
INSERT INTO effects_new VALUES ('11', '2', 'Magnetar', 'Tracking Speed', 'tracking speed.png', '-15%', '-22%', '-29%', '-36%', '-43%', '-50%');
INSERT INTO effects_new VALUES ('12', '2', 'Magnetar', 'Target Painter Strength', 'target painter strength.png', '-15%', '-22%', '-29%', '-36%', '-43%', '-50%');
INSERT INTO effects_new VALUES ('13', '3', 'Red Giant', 'Heat Damage', 'heat damage.jpg', '15%', '22%', '29%', '36%', '43%', '50%');
INSERT INTO effects_new VALUES ('14', '3', 'Red Giant', 'Overload Bonus', 'overload bonus.png', '30%', '44%', '58%', '72%', '86%', '100%');
INSERT INTO effects_new VALUES ('15', '3', 'Red Giant', 'Smart Bomb Range', 'smartbomb.png', '30%', '44%', '58%', '72%', '86%', '100%');
INSERT INTO effects_new VALUES ('16', '3', 'Red Giant', 'Smart Bomb Damage', 'smartbomb.png', '30%', '44%', '58%', '72%', '86%', '100%');
INSERT INTO effects_new VALUES ('17', '3', 'Red Giant', 'Bomb Damage', 'bomb damage.png', '30%', '44%', '58%', '72%', '86%', '100%');
INSERT INTO effects_new VALUES ('18', '4', 'Pulsar', 'Shield HP', 'shield hp.png', '30%', '44%', '58%', '72%', '86%', '100%');
INSERT INTO effects_new VALUES ('19', '4', 'Pulsar', 'Armor Resists', 'armor resists minus.png', '-15%', '-22%', '-29%', '-36%', '-43%', '-50%');
INSERT INTO effects_new VALUES ('20', '4', 'Pulsar', 'Capacitor recharge', 'capacitor recharge.png', '-15%', '-22%', '-29%', '-36%', '-43%', '-50%');
INSERT INTO effects_new VALUES ('21', '4', 'Pulsar', 'Signature', 'signature.jpg', '30%', '44%', '58%', '72%', '86%', '100%');
INSERT INTO effects_new VALUES ('22', '4', 'Pulsar', 'NOS / Neut Drain Amount', 'nos neut drain amount.png', '30%', '44%', '58%', '72%', '86%', '100%');
INSERT INTO effects_new VALUES ('23', '5', 'Wolf Rayet', 'Armor HP', 'armor hp.png', '30%', '44%', '58%', '72%', '86%', '100%');
INSERT INTO effects_new VALUES ('24', '5', 'Wolf Rayet', 'Shield Resist', 'shield resist minus.png', '-15%', '-22%', '-29%', '-36%', '-43%', '-50%');
INSERT INTO effects_new VALUES ('25', '5', 'Wolf Rayet', 'Small Weapon Damage', 'small weapon damage.png', '60%', '88%', '116%', '144%', '172%', '200%');
INSERT INTO effects_new VALUES ('26', '5', 'Wolf Rayet', 'Signature Size', 'signature.jpg', '-15%', '-22%', '-29%', '-36%', '-43%', '-50%');
INSERT INTO effects_new VALUES ('27', '6', 'Cataclysmic Variable', 'Local armor repair amount', 'local armor repair.png', '-15%', '-22%', '-29%', '-36%', '-43%', '-50%');
INSERT INTO effects_new VALUES ('28', '6', 'Cataclysmic Variable', 'Local shield boost amount', 'local shield boost.png', '-15%', '-22%', '-29%', '-36%', '-43%', '-50%');
INSERT INTO effects_new VALUES ('29', '6', 'Cataclysmic Variable', 'Shield transfer amount', 'shield transfer.png', '30%', '44%', '58%', '72%', '86%', '100%');
INSERT INTO effects_new VALUES ('30', '6', 'Cataclysmic Variable', 'Remote repair amount', 'remote repair.png', '30%', '44%', '58%', '72%', '86%', '100%');
INSERT INTO effects_new VALUES ('31', '6', 'Cataclysmic Variable', 'Capacitor capacity', 'capacitor capacity.png', '30%', '44%', '58%', '72%', '86%', '100%');
INSERT INTO effects_new VALUES ('32', '6', 'Cataclysmic Variable', 'Capacitor recharge time', 'capacitor recharge.png', '15%', '22%', '29%', '36%', '43%', '50%');
INSERT INTO effects_new VALUES ('33', '6', 'Cataclysmic Variable', 'Remote Capacitor Transmitter amount', 'capacitor transmitter.png', '-15%', '-22%', '-29%', '-36%', '-43%', '-50%');