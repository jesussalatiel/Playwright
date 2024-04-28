import { DataTable } from '@cucumber/cucumber';
import { faker } from '@faker-js/faker';
import { ViewportSize, devices } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';

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
  static transformTableRows(context: ICustomWorld, table: DataTable): IUserData {
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
        default:
          copyOfDataTable[key] = value;
      }
    });

    return copyOfDataTable;
  }

  private static createResponseOfTransformedRow(
    transformedData: Record<string, string>,
  ): IUserData {
    return {
      code: transformedData.code,
      document_number: transformedData.document_number,
      document_type: transformedData.document_type,
      email: transformedData.email,
      lastName: transformedData.last_name,
      middleName: transformedData.middle_name,
      mobile: transformedData.mobile,
      motherLastName: transformedData.mother_last_name,
      name: transformedData.name,
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

    for (let i = 1; i < mobileNumberLength; i += 1) {
      const digit = Math.floor(Math.random() * 10);
      mobileNumber += digit.toString();
    }

    return String(mobileNumber);
  }

  static async setBrowserEnv(table: DataTable, context: ICustomWorld) {
    await Promise.all(
      // eslint-disable-next-line array-callback-return
      table.hashes().map((row) => {
        let setViewPort: ViewportSize;
        switch (row.device) {
          case 'Mobile':
            setViewPort = devices['iPhone 14 Pro'].viewport;
            break;
          case 'Tablet':
            setViewPort = devices['iPad Mini'].viewport;
            break;
          default:
            setViewPort = { width: 1280, height: 1024 };
        }

        context.page.setViewportSize(setViewPort);

        if (row.browser === 'Firefox') {
        }
      }),
    );
  }
}
