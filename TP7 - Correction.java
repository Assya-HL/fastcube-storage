//Exercice 1

import java.util.*; 
public class Joueur implements Comparable<Joueur> {

	private String nom;
	private int annee;
	private double taille;

	public Joueur(String nom, int annee, double taille) {
		this.nom = nom;
		this.annee = annee;
		this.taille = taille;
	}

	@Override
	public String toString() {
		return nom + "(" + String.format("%.2f", taille) + ")" + ":" + annee;
	}

	@Override
	public int compareTo(Joueur o) { 
		int result = this.nom.compareTo(o.nom);

		if(result == 0)
			return Double.compare(this.taille, o.taille);

		return result;
	}

	public int getAnnee() {
		return annee;
	}
}

class TriAnneeComparator implements Comparator<Joueur> {

	@Override
	public int compare(Joueur o1, Joueur o2) {

		return Integer.compare(o2.getAnnee(), o1.getAnnee());

	}
}
 

class Club {

	public static void main(String[] args) {
 
		List<Joueur> team = new ArrayList<>();
 
		team.add(new Joueur("Ali", 2021, 1.85));
		team.add(new Joueur("Yassine", 2023, 1.92));
		team.add(new Joueur("Ali", 2022, 1.80));

		// Tri ordre naturel
		Collections.sort(team);

		for(Joueur j : team)
			System.out.println(j); 

		// Tri par année décroissante
		Collections.sort(team, new TriAnneeComparator());

		for(Joueur j : team)
			System.out.println(j);  
		
		Set<Joueur> setTeam = new TreeSet<>(team);
		for(Joueur j : setTeam)
			System.out.println(j);
	}
}
/****************************************************/
//Exercice 2
import java.util.*; 

class Eleve {

	private String nom;
	private List<Double> listeNotes = new ArrayList<>();
	private double moyenne;
 
	public Eleve(String nom) {
		this.nom = nom;
	} 
	public double getMoyenne() {
		double somme = 0;
		if(listeNotes.isEmpty()) {
			moyenne = 0;
			return moyenne;
		}	

		for(double n : listeNotes) {
			somme += n;
		}

		moyenne = somme / listeNotes.size();

		return moyenne;
	}
 
	public String getNom() {
		return nom;
	}
 
	public List<Double> getListeNotes() {
		return listeNotes;
	}

	@Override
	public String toString() {
		return nom + " (" + String.format("%.2f", getMoyenne()) + ")";
	}
 
	public void ajouterNote(double note) {

		if(note < 0)
			listeNotes.add(0.0);

		else
			listeNotes.add(note);

	}
} 

class TriParMoyenneComparator implements Comparator<Eleve> {

	@Override
	public int compare(Eleve e1, Eleve e2) {

		return Double.compare(e1.getMoyenne(), e2.getMoyenne());
	}
} 
class Groupe {
 
	private List<Eleve> listeEleves = new LinkedList<>();
 
	public int nombre() {
		return listeEleves.size();
	} 
	public void ajouterEleve(Eleve eleve) {
		listeEleves.add(eleve);
	}
 
	public Eleve chercher(String nom) {

		for(Eleve e : listeEleves) {
			if(e.getNom().equals(nom))
				return e;
		}

		return null;
	}
 
	public void lister() { 
		List<Eleve> L = new ArrayList<>(List.copyOf(listeEleves));
 
		Collections.sort(L, new TriParMoyenneComparator());
 
		for(Eleve e : L)
			System.out.println(e);
	}
} 

public class Main {

	public static void main(String[] args) {

		Groupe g = new Groupe();

		Eleve e1 = new Eleve("med");
		e1.ajouterNote(15);
		e1.ajouterNote(18);

		Eleve e2 = new Eleve("leila");
		e2.ajouterNote(10);
		e2.ajouterNote(12);

		Eleve e3 = new Eleve("sara");
		e3.ajouterNote(19);
		e3.ajouterNote(17);

		g.ajouterEleve(e1);
		g.ajouterEleve(e2);
		g.ajouterEleve(e3);
 
		List<Eleve> liste = new ArrayList<>();

		liste.add(e1);
		liste.add(e2);
		liste.add(e3);

		Collections.sort(liste,
				Collections.reverseOrder(new TriParMoyenneComparator()));

		for(Eleve e : liste)
			System.out.println(e);
	}
}
/*************************************************************/
//Exercice 3
import java.util.*;

public class Main {

	public static void main(String[] args) {

		Set<Integer> s1 = new HashSet<>();
		Set<Integer> s2 = new HashSet<>();

		Random r = new Random();

		for(int i=0; i<10; i++) {
			s1.add(r.nextInt(20));
			s2.add(r.nextInt(20));
		}

		System.out.println("Ensemble 1 : " + s1);
		System.out.println("Ensemble 2 : " + s2);
 
		Set<Integer> inter = new HashSet<>(s1);
		//garder que les valeurs qui existe dans les 2 ensembles
		inter.retainAll(s2);

		System.out.println("Intersection : " + inter);
	}
}
/*****************************************************************/
//Exrecice 4
import java.util.*;

public class Main {

	public static void main(String[] args) {

		String phrase = "java est un langage de programmation orienté objet";

		String[] mots = phrase.split(" ");

		Map<String, Integer> map = new HashMap<>();

		for(String mot : mots) {

			if(map.containsKey(mot))
				map.put(mot, map.get(mot) + 1);

			else
				map.put(mot, 1);
		}

		System.out.println(map);
	}
}
/******************************************************************/
//Exrecice 5
import java.util.*;

public class Main {

	public static void main(String[] args) {

		Map<String, Double> notes = new HashMap<>();

		notes.put("med", 15.5);
		notes.put("leila", 17.0);
		notes.put("lamaie", 12.5);

		double somme = 0;

		for(double n : notes.values()) {
			somme += n;
		}

		double moyenne = somme / notes.size();

		System.out.println("Moyenne = " + moyenne);
	}
}