import * as dotenv from 'dotenv';
import driver from '../../util/neo4j-driver';

dotenv.config();

const findBit = async (_p: any, { id }: any) => {
  const session = driver.session({ database: 'neo4j' });
  try {
    const query = 'MATCH(b:Bit {id: $id}) RETURN b';
    const result = await session.run(query, { id });
    return result.records[0].get('b').properties;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await session.close();
  }
};

module.exports = findBit;
