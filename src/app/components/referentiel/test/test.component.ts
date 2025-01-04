import { Component } from '@angular/core';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
@Component({
selector: 'app-root',
templateUrl: './test.component.html',
styleUrls: ['./test.component.scss']
})
export class TestComponent {
title = 'angular-treeview';
public remoteDatasource : DataManager = new DataManager({
url : 'https://services.odata.org/V4/Northwind/Northwind.svc',
adaptor : new ODataV4Adaptor,
crossDomain : true
});
public dataQuery : Query = new Query().from('Employees').select('EmployeeID,FirstName,Title').take(5);
public childDataQuery : Query = new Query().from('Orders').select('OrderID,EmployeeID,ShipName').take(5);
public remoteDataFields : Object = {
dataSource : this.remoteDatasource, query: this.dataQuery, id: 'EmployeeID', text: 'FirstName', hasChildren: 'EmployeeID',
child : { dataSource : this.remoteDatasource, query: this.childDataQuery, id: 'OrderID', text: 'ShipName', parentID: 'EmployeeID'}
}
public treeviewData : Object[] = [
{ id: '01', name: 'Local Disk (C:)', expanded: true,
       subChild: [
        { id: '01-01', name: 'Program Files', expanded: true,
        subChild: [
          { id: '01-01-01', name: '7-Zip' },
          { id: '01-01-02', name: 'Git' },
          { id: '01-01-03', name: 'IIS Express' }
        ]
        },
        { id: '01-02', name: 'Users', expanded: true,
        subChild: [
          { id: '01-02-01', name: 'Smith' },
          { id: '01-02-02', name: 'Admin' }
         ]
        },
        { id: '01-03', name: 'Windows',
        subChild: [
          { id: '01-03-01', name: 'FileManager' }
         ]
        }
       ]
    },
    { id: '02', name: 'Local Disk (D:)',
       subChild: [
        { id: '02-01', name: 'Personals' },
        { id: '02-02', name: 'Projects' }
      ]
    },
    { id: '03', name: 'Local Disk (E:)',
       subChild: [
        { id: '03-01', name: 'Pictures' },
        { id: '03-02', name: 'Documents' }
      ]
    }
  ];
  public datasourceFields : Object = {
    dataSource : this.treeviewData, id: 'id', text: 'name', child: 'subChild'
  }
}
