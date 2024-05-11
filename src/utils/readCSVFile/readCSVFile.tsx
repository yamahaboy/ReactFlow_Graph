import Papa from 'papaparse';
import { UserAction } from '../../models/IUserActionProps';

const readCSVFile = async (csvUrl: string): Promise<UserAction[]> => {
    const response = await fetch(csvUrl);
    const csvText = await response.text();
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.data) {
            resolve(results.data as UserAction[]);
          } else {
            reject(new Error('No data to parse.'));
          }
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  };
  
export default readCSVFile
