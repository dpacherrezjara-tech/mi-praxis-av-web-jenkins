prototype.idDE22 = prototype.id + '-CalendarDataEntry';
Ext.define('Ext.Praxis.view.payments.InputsSecondPhaseForm.DataEntrys.CalendarDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.CalendarDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.InputsSecondPhase.CalendarDataEntryController'
    ],
    controller: 'CalendarDataEntryController',
    title: 'Calendar - Data Entry Form',
    config: {
        searchParams: null
    },
    header: true,
    width: 700,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idDE2 + '-form-calendar-de01',
            defaults: {
                style: 'margin: 3px;',
                border: true
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width: '100%',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idDE2 + '-gridCalendar',
                            width: '100%',
                            minHeight: 100,
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false
                            },
                            columnLines: true,
                            columns: {
                                defaults: {
                                    align: 'center',
                                    menuDisabled: true,
                                    sortable: true
                                },
                                items: [
                                    {text: 'Processor', dataIndex: 'PROCESADOR', width: 150,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'background:#CBCDA0;text-align:center;font-weight: bold;';
                                            return value;
                                        }
                                    },
                                    {text: 'File Type', dataIndex: 'TFILE', flex: 1},
                                    {text: 'Date', dataIndex: 'FECHA', width: 80},
                                    {text: 'Total', dataIndex: 'TOTALROWS', width: 60},
                                    {text: 'Status', dataIndex: 'STATUS', width: 50,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            const opcion = {
                                                '0': () => {
                                                    metaData.tdAttr = 'data-qtip="OK"';
                                                    return '<img src="resources/img/icon/16x16/check.png"/>';
                                                },
                                                '1': () => {
                                                    metaData.tdAttr = 'data-qtip="NOT FOUND"';
                                                    return '<img src="resources/img/icon/delete.png"/>';
                                                }
                                            };
                                            return opcion[value]();
                                        }
                                    }
                                ]
                            }

                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            //margin: '5 0 5 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});
