
Ext.define('Ext.Praxis.controller.tnu.AtlByTransactionType.AtlByTransactionTypeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AtlByTransactionTypeController',
    beanTMP: {},
    /**
     * Constructor
     */
    init: function() {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function()
    {
        //paginador disable
        Ext.getCmp(prototype.id + '-pagginator-01').disable();
        //load data default
        this.setGridData();
    },
    onSearchClick: function()
    {
        this.setGridData();
    },
    setGridData: function(str_tipo)
    {
        //console.log(str_tipo);
        // */-*+2º1q+
        // return;       
        var me = this;
        var periodo = Ext.getCmp(prototype.id + '-periodo').getValue();
        if (periodo === '') {
            global.Msg({
                msg: 'Select period'
            });
            return;
        }
        ;
        //Para EXCEL
        me.beanTMP.VP_CCUST = ''; //No Used
        me.beanTMP.IN_AÑO = periodo;
        me.beanTMP.VP_TRANSACCION = str_tipo;

        win.lblUser_toolTip("Estructura: A1889");
        var contenedor = Ext.getCmp(prototype.id + '-panel-tree');

        //    contenedor.removeAll();

        Ext.Ajax.request({
            url: prototype.url + '/search',
            method: 'GET',
            //params: { beanString: JSON.stringify(beanDet) },
            params: {
                VP_CCUST: '',
                VP_PERIODO: periodo,
                VP_TRANSACCION: str_tipo
            },
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                res = res.data;
                //console.log(res);  
                //<editor-fold defaultstate="collapsed" desc="dataRoot">
                var a = [];
                var dataRoot = {text: '.', expanded: false, children: []};

                Ext.Object.each(res, function(index, value) {
                    if (a.indexOf(value.A1889TRX01) < 0)
                    {
                        a.push(value.A1889TRX01);
                        dataRoot.children.push({
                            DESCRIPTION: value.A1889TRX01,
                            A1889IMP01: parseFloat(value.A1889IMP01),
                            A1889IMP02: parseFloat(value.A1889IMP02),
                            A1889IMP03: parseFloat(value.A1889IMP03),
                            A1889IMP04: parseFloat(value.A1889IMP04),
                            A1889IMP05: parseFloat(value.A1889IMP05),
                            A1889IMP06: parseFloat(value.A1889IMP06),
                            A1889IMP07: parseFloat(value.A1889IMP07),
                            A1889IMP08: parseFloat(value.A1889IMP08),
                            A1889IMP09: parseFloat(value.A1889IMP09),
                            A1889IMP10: parseFloat(value.A1889IMP10),
                            A1889IMP11: parseFloat(value.A1889IMP11),
                            A1889IMP12: parseFloat(value.A1889IMP12),
                            TOTAL: parseFloat(value.TOTAL),
                            NIVEL: 1,
                            expanded: false, children: []});
                        //Node2 
                        var b = [];
                        Ext.Object.each(res, function(index, value01) {
                            if (value.A1889TRX01 === value01.A1889TRX01) {
                                if (b.indexOf(value01.A1889TRX02) < 0) {
                                    b.push(value01.A1889TRX02);
                                    dataRoot.children[a.indexOf(value.A1889TRX01)].children.push({
                                        DESCRIPTION: value01.A1889TRX02,
                                        A1889IMP01: parseFloat(value01.A1889IMP01),
                                        A1889IMP02: parseFloat(value01.A1889IMP02),
                                        A1889IMP03: parseFloat(value01.A1889IMP03),
                                        A1889IMP04: parseFloat(value01.A1889IMP04),
                                        A1889IMP05: parseFloat(value01.A1889IMP05),
                                        A1889IMP06: parseFloat(value01.A1889IMP06),
                                        A1889IMP07: parseFloat(value01.A1889IMP07),
                                        A1889IMP08: parseFloat(value01.A1889IMP08),
                                        A1889IMP09: parseFloat(value01.A1889IMP09),
                                        A1889IMP10: parseFloat(value01.A1889IMP10),
                                        A1889IMP11: parseFloat(value01.A1889IMP11),
                                        A1889IMP12: parseFloat(value01.A1889IMP12),
                                        TOTAL: parseFloat(value01.TOTAL),
                                        NIVEL: 2,
                                        expanded: false, children: []
                                    });
                                    //console.log(value01.A1889TRX01 + '<->' + value01.A1889TRX02 + '<->' + value01.A1889TRX03 );

                                    Ext.Object.each(res, function(index, value02) {
                                        if (value01.A1889TRX01 === value02.A1889TRX01 && value01.A1889TRX02 === value02.A1889TRX02) {
                                            //console.log(value01.A1889TRX01 + '<->' + value01.A1889TRX02 + '<->' + value01.A1889TRX03 );
                                            dataRoot.children[a.indexOf(value01.A1889TRX01)].children[b.indexOf(value01.A1889TRX02)].children.push({
                                                DESCRIPTION: value02.A1889TRX03,
                                                A1889IMP01: parseFloat(value02.A1889IMP01),
                                                A1889IMP02: parseFloat(value02.A1889IMP02),
                                                A1889IMP03: parseFloat(value02.A1889IMP03),
                                                A1889IMP04: parseFloat(value02.A1889IMP04),
                                                A1889IMP05: parseFloat(value02.A1889IMP05),
                                                A1889IMP06: parseFloat(value02.A1889IMP06),
                                                A1889IMP07: parseFloat(value02.A1889IMP07),
                                                A1889IMP08: parseFloat(value02.A1889IMP08),
                                                A1889IMP09: parseFloat(value02.A1889IMP09),
                                                A1889IMP10: parseFloat(value02.A1889IMP10),
                                                A1889IMP11: parseFloat(value02.A1889IMP11),
                                                A1889IMP12: parseFloat(value02.A1889IMP12),
                                                TOTAL: parseFloat(value02.TOTAL),
                                                NIVEL: 3,
                                                //index      : index,
                                                leaf: true
                                            });
                                        }
                                    });
                                } else {
                                    dataRoot.children[a.indexOf(value.A1889TRX01)].children[b.indexOf(value01.A1889TRX02)].A1889IMP01 += parseInt(value01.A1889IMP01);
                                    dataRoot.children[a.indexOf(value.A1889TRX01)].children[b.indexOf(value01.A1889TRX02)].A1889IMP02 += parseFloat(value01.A1889IMP02);
                                    dataRoot.children[a.indexOf(value.A1889TRX01)].children[b.indexOf(value01.A1889TRX02)].A1889IMP03 += parseInt(value01.A1889IMP03);
                                    dataRoot.children[a.indexOf(value.A1889TRX01)].children[b.indexOf(value01.A1889TRX02)].A1889IMP04 += parseInt(value01.A1889IMP04);
                                    dataRoot.children[a.indexOf(value.A1889TRX01)].children[b.indexOf(value01.A1889TRX02)].A1889IMP05 += parseFloat(value01.A1889IMP05);
                                    dataRoot.children[a.indexOf(value.A1889TRX01)].children[b.indexOf(value01.A1889TRX02)].A1889IMP06 += parseFloat(value01.A1889IMP06);
                                    dataRoot.children[a.indexOf(value.A1889TRX01)].children[b.indexOf(value01.A1889TRX02)].A1889IMP07 += parseFloat(value01.A1889IMP07);
                                    dataRoot.children[a.indexOf(value.A1889TRX01)].children[b.indexOf(value01.A1889TRX02)].A1889IMP08 += parseFloat(value01.A1889IMP08);
                                    dataRoot.children[a.indexOf(value.A1889TRX01)].children[b.indexOf(value01.A1889TRX02)].A1889IMP09 += parseFloat(value01.A1889IMP09);
                                    dataRoot.children[a.indexOf(value.A1889TRX01)].children[b.indexOf(value01.A1889TRX02)].A1889IMP10 += parseFloat(value01.A1889IMP10);
                                    dataRoot.children[a.indexOf(value.A1889TRX01)].children[b.indexOf(value01.A1889TRX02)].A1889IMP11 += parseFloat(value01.A1889IMP11);
                                    dataRoot.children[a.indexOf(value.A1889TRX01)].children[b.indexOf(value01.A1889TRX02)].A1889IMP12 += parseFloat(value01.A1889IMP12);
                                    dataRoot.children[a.indexOf(value.A1889TRX01)].children[b.indexOf(value01.A1889TRX02)].TOTAL += parseFloat(value01.TOTAL);
                                }
                            }
                        });
                    }
                    else {
                        dataRoot.children[a.indexOf(value.A1889TRX01)].A1889IMP01 += parseFloat(value.A1889IMP01);
                        dataRoot.children[a.indexOf(value.A1889TRX01)].A1889IMP02 += parseFloat(value.A1889IMP02);
                        dataRoot.children[a.indexOf(value.A1889TRX01)].A1889IMP03 += parseFloat(value.A1889IMP03);
                        dataRoot.children[a.indexOf(value.A1889TRX01)].A1889IMP04 += parseFloat(value.A1889IMP04);
                        dataRoot.children[a.indexOf(value.A1889TRX01)].A1889IMP05 += parseFloat(value.A1889IMP05);
                        dataRoot.children[a.indexOf(value.A1889TRX01)].A1889IMP06 += parseFloat(value.A1889IMP06);
                        dataRoot.children[a.indexOf(value.A1889TRX01)].A1889IMP07 += parseFloat(value.A1889IMP07);
                        dataRoot.children[a.indexOf(value.A1889TRX01)].A1889IMP08 += parseFloat(value.A1889IMP08);
                        dataRoot.children[a.indexOf(value.A1889TRX01)].A1889IMP09 += parseFloat(value.A1889IMP09);
                        dataRoot.children[a.indexOf(value.A1889TRX01)].A1889IMP10 += parseFloat(value.A1889IMP10);
                        dataRoot.children[a.indexOf(value.A1889TRX01)].A1889IMP11 += parseFloat(value.A1889IMP11);
                        dataRoot.children[a.indexOf(value.A1889TRX01)].A1889IMP12 += parseFloat(value.A1889IMP12);
                        dataRoot.children[a.indexOf(value.A1889TRX01)].TOTAL += parseFloat(value.TOTAL);
                    }

                });
                //</editor-fold>

                //<editor-fold defaultstate="collapsed" desc="gridTree">

                var tree = Ext.create('Ext.tree.Panel', {
                    id: prototype.id + '-tree-grid',
                    width: '100%',
                    height: '100%',
                    root: dataRoot,
                    reserveScrollbar: true,
                    useArrows: true,
                    rootVisible: false,
                    multiSelect: true,
                    columnLines: true,
                    rowLines: true,
                    columns: [
                        {
                            xtype: 'treecolumn',
                            text: 'Transaction',
                            dataIndex: 'DESCRIPTION',
                            width: 120,
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                //console.log(record.data["NIVEL"]);
                                if(record.data["NIVEL"] == "1") metaData.style = "color:blue;";
                                if(record.data["NIVEL"] == "2") metaData.style = "color:green;";
                                return value;
                            }
                        },
                        {
                            text: 'Months',
                            columns: [{
                                    text: 'January',
                                    dataIndex: 'A1889IMP01',
                                    width: 90,
                                    align: 'right',
                                    renderer: function(value, metaData, record, rowIndex, colIndex) {
                                        if(record.data["NIVEL"] == "1") metaData.style = "color:blue;";
                                        if(record.data["NIVEL"] == "2") metaData.style = "color:green;";                                        
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }
                                }, {
                                    text: 'February',
                                    dataIndex: 'A1889IMP02',
                                    width: 90,
                                    align: 'right',
                                    renderer: function(value, metaData, record, rowIndex, colIndex) {
                                        if(record.data["NIVEL"] == "1") metaData.style = "color:blue;";
                                        if(record.data["NIVEL"] == "2") metaData.style = "color:green;";                                        
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }
                                }, {
                                    text: 'March',
                                    dataIndex: 'A1889IMP03',
                                    width: 90,
                                    align: 'right',
                                    renderer: function(value, metaData, record, rowIndex, colIndex) {
                                        if(record.data["NIVEL"] == "1") metaData.style = "color:blue;";
                                        if(record.data["NIVEL"] == "2") metaData.style = "color:green;";                                        
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }
                                }, {
                                    text: 'April',
                                    dataIndex: 'A1889IMP04',
                                    width: 90,
                                    align: 'right',
                                    renderer: function(value, metaData, record, rowIndex, colIndex) {
                                        if(record.data["NIVEL"] == "1") metaData.style = "color:blue;";
                                        if(record.data["NIVEL"] == "2") metaData.style = "color:green;";                                        
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }
                                }, {
                                    text: 'May',
                                    dataIndex: 'A1889IMP05',
                                    width: 90,
                                    align: 'right',
                                    renderer: function(value, metaData, record, rowIndex, colIndex) {
                                        if(record.data["NIVEL"] == "1") metaData.style = "color:blue;";
                                        if(record.data["NIVEL"] == "2") metaData.style = "color:green;";                                        
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }
                                }, {
                                    text: 'June',
                                    dataIndex: 'A1889IMP06',
                                    width: 90,
                                    align: 'right',
                                    renderer: function(value, metaData, record, rowIndex, colIndex) {
                                        if(record.data["NIVEL"] == "1") metaData.style = "color:blue;";
                                        if(record.data["NIVEL"] == "2") metaData.style = "color:green;";                                        
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }
                                }, {
                                    text: 'July',
                                    dataIndex: 'A1889IMP07',
                                    width: 90,
                                    align: 'right',
                                    renderer: function(value, metaData, record, rowIndex, colIndex) {
                                        if(record.data["NIVEL"] == "1") metaData.style = "color:blue;";
                                        if(record.data["NIVEL"] == "2") metaData.style = "color:green;";                                        
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }
                                }, {
                                    text: 'August',
                                    dataIndex: 'A1889IMP08',
                                    width: 90,
                                    align: 'right',
                                    renderer: function(value, metaData, record, rowIndex, colIndex) {
                                        if(record.data["NIVEL"] == "1") metaData.style = "color:blue;";
                                        if(record.data["NIVEL"] == "2") metaData.style = "color:green;";                                        
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }
                                }, {
                                    text: 'September',
                                    dataIndex: 'A1889IMP09',
                                    width: 90,
                                    align: 'right',
                                    renderer: function(value, metaData, record, rowIndex, colIndex) {
                                        if(record.data["NIVEL"] == "1") metaData.style = "color:blue;";
                                        if(record.data["NIVEL"] == "2") metaData.style = "color:green;";                                        
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }
                                }, {
                                    text: 'October',
                                    dataIndex: 'A1889IMP10',
                                    width: 90,
                                    align: 'right',
                                    renderer: function(value, metaData, record, rowIndex, colIndex) {
                                        if(record.data["NIVEL"] == "1") metaData.style = "color:blue;";
                                        if(record.data["NIVEL"] == "2") metaData.style = "color:green;";                                        
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }
                                }, {
                                    text: 'November',
                                    dataIndex: 'A1889IMP11',
                                    width: 90,
                                    align: 'right',
                                    renderer: function(value, metaData, record, rowIndex, colIndex) {
                                        if(record.data["NIVEL"] == "1") metaData.style = "color:blue;";
                                        if(record.data["NIVEL"] == "2") metaData.style = "color:green;";                                        
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }
                                }, {
                                    text: 'December',
                                    dataIndex: 'A1889IMP12',
                                    width: 90,
                                    align: 'right',
                                    renderer: function(value, metaData, record, rowIndex, colIndex) {
                                        if(record.data["NIVEL"] == "1") metaData.style = "color:blue;";
                                        if(record.data["NIVEL"] == "2") metaData.style = "color:green;";                                        
                                        return Ext.util.Format.number(value, '0,000.00');
                                    }
                                }]
                        },
                        {
                            text: 'Total',
                            dataIndex: 'TOTAL',
                            width: 100,
                            align: 'right',
                            renderer: function(value, metaData, record, rowIndex, colIndex) {
                                if(record.data["NIVEL"] == "1") metaData.style = "color:blue;";
                                if(record.data["NIVEL"] == "2") metaData.style = "color:green;";                                        
                                return Ext.util.Format.number(value, '0,000.00');
                            }
                        }
                    ],
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: false,
                        markDirty: false,
                        getRowClass: function(record, rowIndex, rowParams, store) {                                                 
                            if (rowIndex % 2 === 0)
                               return 'x-grid-cell';
                        }
                    },
                    dockedItems: {
                        xtype: 'toolbar',
                        dock: 'left',
                        border: false,
                        items: [
                            {
                                xtype: 'button',
                                icon: 'resources/img/botones/expanded.png',
                                tooltip: 'Expand the tree',
                                enableToggle: true,
                                toggleHandler: function(button, pressed, eOpts) {
                                    Ext.getCmp(prototype.id + '-tree-grid').expandAll();
                                }
                            },
                            {
                                xtype: 'button',
                                icon: 'resources/img/botones/collaped.png',
                                tooltip: 'Collapse the tree',
                                enableToggle: true,
                                toggleHandler: function(button, pressed, eOpts) {
                                    Ext.getCmp(prototype.id + '-tree-grid').collapseAll();
                                }
                            }
                        ]
                    }
                });
                //</editor-fold>            
                contenedor.add(tree);
                contenedor.updateLayout();

            }
        });

    },
    onExcelClick: function(obj)
    {
        if (Ext.Object.getSize(this.beanTMP) > 0) {
            Ext.Msg.show({
                title: '.:PRAXISEX:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') {
                        global.getFile(prototype.url + '/AtlByTrxType_excel?beanString=' + encodeURI(JSON.stringify(this.beanTMP)));
                    }
                }
            });
        }
    },
    onFilterClick: function()
    {
        var option = Ext.getCmp(prototype.id + '-contenedor-filters-form');
        if (option.isVisible())
            option.setVisible(false);
        else
            option.setVisible(true);
    },
    onClearClick: function()
    {
        //no aplica
    },
    onPaginationChkChange: function(obj, newValue, oldValue, eOpts)
    {
        Ext.getCmp(prototype.id + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.id + '-pagginator-01').disable();
        } else {
            Ext.getCmp(prototype.id + '-pagginator-01').enable();
        }
    }

});

