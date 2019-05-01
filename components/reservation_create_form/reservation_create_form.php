<div class="container">
	<div class="row">
		<div class="col-xs-12">
			<h1>Crear reserva</h1>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<div class="error">
				<p id="errMessage"></p>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-xs-12">
			<form id="create">				
				<div class="form-group">
					<label for="name">Nombre</label>
					<input id="name" name="name" type="text" minlength="3" value="" required /> 
				</div>
				<div class="form-group">
					<label for="surnames">Apellidos</label>
					<input id="surnames" name="surnames" type="text" minlength="3" value="" required /> 
				</div>
				<div class="form-group">
					<label for="phone">Teléfono</label>
					<input id="phone" name="phone" type="text" minlength="9" value="" required /> 
				</div>
				<div class="form-group">
					<label class="description" for="element_3">Fecha</label>
					<input id="date" name="date" type="date" value="" required />
				</div>
				<div class="form-group">
					<label class="description" for="hours">Hora</label>
					<input id="hours" name="hours" type="number" min="0" max="23" value="" required /> : 
					<input id="minutes" name="minutes" type="number" min="0" max="59" value="" required />
				</div>
				<div class="form-group">
					<label for="guests">Comensales</label>
					<input id="guests" name="guests" type="number" min="1" value="" required/> 
				</div>
				<input id="saveForm" class="btn btn-primary" type="submit" name="submit" value="Crear" required/>
			</form>
		</div>
	</div>
</div>