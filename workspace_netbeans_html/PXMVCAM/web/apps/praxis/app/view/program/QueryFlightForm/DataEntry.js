Ext.define('Ext.Praxis.view.program.QueryFlightForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryQueryFlightForm',

    controller: 'DataEntryQueryFlightController',

    requires: [
        'Ext.Praxis.controller.program.QueryFlight.DataEntryQueryFlightController'
    ],

    title: 'Help Information',
    header: true,
    height: 420,
    width: 760,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,

    defaults: {
        border: false
    },

    items: [
        {
            xtype: 'form',
            id: prototype.id + '-formDataEntry',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                // <editor-fold defaultstate="collapsed" desc="gridDataEntry">
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridDataEntry',
                    border: true,
                    width: 744,
                    height: 350,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {
                                text: 'Field',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                columns: [
                                    {
                                        text: 'Code', dataIndex: 'USERFIELD', width: 110,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Description', dataIndex: 'DESCRIPT', width: 170,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:left;";
                                            metaData.tdAttr = 'data-qtip="' + data.DESCRIPT+'"';
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Size', dataIndex: 'LENGHTF', width: 70
                            },
                            {
                                text: 'Examples', dataIndex: 'strExample', width: 380,
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var data = record.data;
                                    metaData.style = "text-align:left;";
                                    metaData.tdAttr = 'data-qtip="' + data.strExample+'"';
                                    return value;
                                }
                            }
                        ]
                    }
                }
                // </editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center;',
            defaults: {
                scale: 'medium'
            },
            items: [
            ]
        }
    ]
});