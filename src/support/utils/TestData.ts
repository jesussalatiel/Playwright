import { ICustomWorld } from '../custom-world';
import { DataTable } from '@cucumber/cucumber';
import { faker } from '@faker-js/faker';

interface IUserData {
  code: string;
  mobile: string;
  name: string;
  lastName: string;
  middleName: string;
  motherLastName: string;
  email: string;
  document_type: string;
  document_number: string;
}

const TagsFromDataTable = {
  BY_MOBILE: 'set:random:mobile',
  BY_EMAIL: 'set:random:email',
  BY_DOCUMENT_NUMBER: 'set:random:document_number',
};

export class TestData {
  static transformTableRows(context: ICustomWorld, table: DataTable): IUserData | undefined {
    let transformedRow: IUserData | undefined;

    table.hashes().some((row: Record<string, string>) => {
      const transformedData = TestData.transformRow(row, context);
      transformedRow = TestData.createResponseOfTransformedRow(transformedData);
      return true;
    });

    return transformedRow;
  }

  private static transformRow(
    row: Record<string, string>,
    context: ICustomWorld,
  ): Record<string, string> {
    const copyOfDataTable: Record<string, string> = { ...row };

    Object.keys(copyOfDataTable).forEach((key) => {
      const value = copyOfDataTable[key];

      switch (true) {
        case value.includes(TagsFromDataTable.BY_MOBILE):
          copyOfDataTable[key] = context.mobile;
          break;
        case value.includes(TagsFromDataTable.BY_EMAIL):
          copyOfDataTable[key] = faker.internet.email({
            provider: 'globant.com',
          });
          break;
        case value.includes(TagsFromDataTable.BY_DOCUMENT_NUMBER):
          copyOfDataTable[key] = context.identityDocument;
          break;
      }
    });

    return copyOfDataTable;
  }

  private static createResponseOfTransformedRow(
    transformedData: Record<string, string>,
  ): IUserData {
    return {
      code: transformedData['code'],
      document_number: transformedData['document_number'],
      document_type: transformedData['document_type'],
      email: transformedData['email'],
      lastName: transformedData['last_name'],
      middleName: transformedData['middle_name'],
      mobile: transformedData['mobile'],
      motherLastName: transformedData['mother_last_name'],
      name: transformedData['name'],
    };
  }

  static setDocumentNumber(): string {
    let randomNumber: number;
    const min = 10000000;
    const max = 99999999;

    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (String(randomNumber)[0] === '0');

    return String(randomNumber);
  }

  static setMobilePhoneNumber(): string {
    const mobileNumberLength = 9;
    let mobileNumber = '9';

    for (let i = 1; i < mobileNumberLength; i++) {
      const digit = Math.floor(Math.random() * 10);
      mobileNumber += digit.toString();
    }

    return String(mobileNumber);
  }
}
