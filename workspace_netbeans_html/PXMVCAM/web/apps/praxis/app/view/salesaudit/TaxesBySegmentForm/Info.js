/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.salesaudit.TaxesBySegmentForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            xtype: 'panel',
            layout: {
                type: 'table',
                columns: 1
            },
            items: [
                {
                    xtype: 'panel',
                    title: '<b style="font-size:12px">DEPARTURE<b/>',
                    bodyStyle: 'background: #E5ECEF',
                    margin: '1 5 0 0',
                    defaults: {
                        border: false
                    },
                    items: [
                        {
                            xtype: 'tbspacer',
                            height: 5
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'table',
                                columns: 7
                            },
                            defaults: {
                                style: 'font-weight: bold; font-size: 11px;',
                                xtype: 'textfield',
                                width: 35,
                                hideLabel: true,
                                readOnly: true
                            },
                            items: [
                                {
                                    xtype: 'tbspacer',
                                    height: 5,
                                    colspan: 7
                                },
                                {
                                    xtype: 'box',
                                    html: 'Country:',
                                    width: 50
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPais',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    emptyText: 'By Code',
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    readOnly: false,
                                    listeners: {
                                        keyup: function(combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z0-9]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        },
                                        //change: me.changeCmbPais
                                    }
                                },
                                {
                                    xtype: 'tbspacer',
                                    width: 5
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPaisName',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    emptyText: 'By Name',
                                    valueField: 'code', displayField: 'name',
                                    width: 200,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    readOnly: false,
                                    listeners: {
                                        keyup: function(combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z0-9]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        },
                                        //change: me.onBtnSearchClick
                                    }
                                },
                                {
                                    xtype: 'tbspacer',
                                    colspan: 3
                                },
                                {
                                    xtype: 'box',
                                    html: 'Airport:',
                                    width: 50
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbAirport',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    emptyText: 'Airports',
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    readOnly: false,
                                    listeners: {
                                        keyup: function(combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z0-9]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        },
                                        //change: me.onBtnSearchClick
                                    }
                                },
                                {
                                    xtype: 'tbspacer',
                                    width: 5
                                },
                                {
                                    id: prototype.id + '-txtAirportName',
                                    width: 200
                                },
                                {
                                    xtype: 'tbspacer',
                                    width: 5
                                },
                                {
                                    xtype: 'box',
                                    html: 'State:',
                                    width: 45
                                },
                                {
                                    id: prototype.id + '-txtState',
                                    width: 150
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDeparture',
                                    height: 100,
                                    width: 700,
                                    columnLines: true,
                                    colspan: 7,
                                    columns: {
                                        items: [
                                            {text: '<span style="font-size: 10px;">ID</span>', dataIndex: 'A1202IDTAX', width: 80, visible:false},
                                            {text: '<span style="font-size: 10px;">CODE</span>', dataIndex: 'A1202CODTA', width: 80},
                                            {
                                                text: '<span style="font-size: 10px;">NAME</span>', dataIndex: 'A1202TNAME', flex: 1,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.A1224EAM + '"';
                                                    return value;
                                                }
                                            }
                                        ],
                                        defaults: {
                                            menuDisabled: true,
                                            align: 'center'
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: '<b style="font-size:12px">ARRIVAL<b/>',
                    bodyStyle: 'background: #E5ECEF',
                    margin: '1 5 0 0',
                    defaults: {
                        border: false
                    },
                    items: [
                        {
                            xtype: 'tbspacer',
                            height: 5
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'table',
                                columns: 7
                            },
                            defaults: {
                                style: 'font-weight: bold; font-size: 11px;',
                                xtype: 'textfield',
                                width: 35,
                                hideLabel: true,
                                readOnly: true
                            },
                            items: [
                                {
                                    xtype: 'tbspacer',
                                    height: 5,
                                    colspan: 7
                                },
                                {
                                    xtype: 'box',
                                    html: 'Country:',
                                    width: 50
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPaisArr',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    emptyText: 'By Code',
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    readOnly: false,
                                    listeners: {
                                        keyup: function(combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z0-9]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        },
                                        //change: me.onBtnSearchClick
                                    }
                                },
                                {
                                    xtype: 'tbspacer',
                                    width: 5
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPaisNameArr',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    emptyText: 'By Name',
                                    valueField: 'code', displayField: 'name',
                                    width: 200,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    readOnly: false,
                                    listeners: {
                                        keyup: function(combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z0-9]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        },
                                        //change: me.onBtnSearchClick
                                    }
                                },
                                {
                                    xtype: 'tbspacer',
                                    colspan: 3
                                },
                                {
                                    xtype: 'box',
                                    html: 'Airport:',
                                    width: 50
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbAirportArr',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    emptyText: 'Airports',
                                    valueField: 'code', displayField: 'name',
                                    width: 75,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    readOnly: false,
                                    listeners: {
                                        keyup: function(combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z0-9]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        },
                                        //change: me.onBtnSearchClick
                                    }
                                },
                                {
                                    xtype: 'tbspacer',
                                    width: 5
                                },
                                {
                                    id: prototype.id + '-txtAirportNameArr',
                                    width: 200
                                },
                                {
                                    xtype: 'tbspacer',
                                    width: 5
                                },
                                {
                                    xtype: 'box',
                                    html: 'State:',
                                    width: 45
                                },
                                {
                                    id: prototype.id + '-txtStateArr',
                                    width: 150
                                },
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridArrival',
                                    height: 100,
                                    width: 700,
                                    columnLines: true,
                                    colspan: 7,
                                    columns: {
                                        items: [
                                            //{text: '<span style="font-size: 10px;">ID</span>', dataIndex: 'A1202IDTAX', width: 80, visible:false},
                                            {text: '<span style="font-size: 10px;">CODE</span>', dataIndex: 'A1202CODTA', width: 80},
                                            {
                                                text: '<span style="font-size: 10px;">NAME</span>', dataIndex: 'A1202TNAME', flex: 1,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    var data = record.data;
                                                    metaData.style = "text-align:left;";
                                                    metaData.tdAttr = 'data-qtip="' + data.A1224EAM + '"';
                                                    return value;
                                                }
                                            }
                                        ],
                                        defaults: {
                                            menuDisabled: true,
                                            align: 'center'
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
);