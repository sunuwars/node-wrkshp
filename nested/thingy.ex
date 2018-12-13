defmodule Thingy do
  def sum(x, y) do
    x + y
  end
 
  def map([], _callback), do: []

  def map([head|tail], callback) do
    #[function.(head) | map(tail,function)]
    a = callback.(head)
    b = map(tail, callback)
     [a | b] 
  end

def filter([], _callback), do: []

 def filter([head|tail], callback) do
    a = callback.(head)
    b = filter(tail, callback) 
    [a | b]
end

def has_interests?(%{interests: interests}) do
  case interests do
  [] ->  false
  _ -> true
  end
end

def has_interest?(%{interests: interests}, val ) do
  case val do
  "music" -> true
  _  -> false
  end
end


def has_interests?(_), do: false






end
