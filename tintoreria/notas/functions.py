#from escpos.printer import Usb
from escpos import *

def impresion(nota):
	""" Seiko Epson Corp. Receipt Printer (EPSON TM-TM-T20II) """
	p = printer.Usb(0x04b8, 0x0e15)
	#p.set(align="center",font="a",bold=True,underline=0,width=1,density=9,invert=False,smooth=False,flip=False,double_width=False,double_height=False,custom_size=False)
	p.set(align="center",font="a")
	p.text("Tintoreria y planchaduria\n")
	p.text("PRINCESA\n\n")
	p.set(align="left",font="a")
	p.text("Folio: {0}      ".format(str(nota.id).zfill(6)))
	p.text("Fecha de Recibido: " + nota.fecha_captura.strftime("%d/%m/%y")+"\n\n") #time.strftime("%d/%m/%y")+"\n\n")
	p.set(align="left",font="a")
	p.text("Reynolds Aluminio 37\n")
	p.text("Col. Vista Hermosa\n")
	p.text("C.P. 54080\n")
	p.text("Tlalnepantla, Edo. de Mexico\n")
	p.text("Horario de Lunes a Sabado de 8:00 am a 7:00 pm\n")
	p.text("Telefonos: 55-28-21-86-37 y 55-61-96-55-54\n")
	p.text("----------------------------------------------\n")
	p.set(align="center",font="a")
	p.text("Cliente\n")
	p.set(align="left",font="a")
	p.text("Nombre: " + nota.cliente.get_nombre_completo() + "\n")
	p.text("----------------------------------------------\n")
	p.set(align="center",font="a")
	p.text("Articulos\n")
	p.set(align="left",font="a")
	v_tot_cantidad=0
	v_tot_precio=0
	p.text("Articulo".ljust(9,' ')+"Servicio".ljust(9,' ')+"Precio U".rjust(9,' ')+"Cant".rjust(9,' ')+"Precio T".rjust(9,' ')+"\n")#51
	for row in nota.detalle.all():
		v_articulo = row.articulo.descripcion
		v_servicio = row.servicio.nombre
		v_precio_u = row.precio_unitario
		v_cantidad = row.cantidad
		v_precio_tot = row.precio
		v_tot_cantidad=v_tot_cantidad+v_cantidad
		v_tot_precio = v_tot_precio+v_precio_tot
		p.text(v_articulo.ljust(9,' ')+v_servicio.ljust(9,' ')+("$"+str(v_precio_u)).rjust(9,' ')+str(v_cantidad).rjust(9,' ')+("$"+str(v_precio_tot)).rjust(9,' ')+"\n")
	p.text("----------------------------------------------\n")
	p.text("Total:".ljust(27,' ')+str(v_tot_cantidad).rjust(9,' ')+("$"+str(v_tot_precio)).rjust(9,' ')+"\n")
	p.text("----------------------------------------------\n")
	p.text("A cuenta: $100\n")
	p.text("Debe: $40\n")
	p.barcode(str(nota.id).zfill(13), 'EAN13', 64, 2, '', '')
	p.set(align="center",font="a")
	p.text("\nClausulas\n")
	p.set(align="left",font="a")
	p.text("1.- En el planchado No estamos obligados a restablecer la apariencia original de la prenda en lo que se refiere a tersura y/o tamaño")
	#p.barcode('123456789', 'EAN13', 64, 2, '', '')
	p.cut()