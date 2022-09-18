<h1>{{$name}}</h1>
Product id : {{$id}}, Type : {{$r_type}}
<br>

<div>
    @if ($id == 1)
        1 Numaralı ürün gösterildi
    @elseif($id == 2)
        2 Numaralı ürün gösterildi
    @else
        x Numaralı ürün gösterildi
    @endif
</div>

<div>
    @for($i=0 ; $i<10 ; $i++)
        Döngi değeri : {{$i}}
        <br>
    @endfor

    <br><br>

    @foreach($categories as $category)
        {{$category}} <br>
        @endforeach
</div>

<!-- Commet HTML -->
{{-- Comment PHP --}}
